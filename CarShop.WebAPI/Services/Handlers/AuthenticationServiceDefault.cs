using CarShop.Core;
using CarShop.Core.BusinessEntities.Security;
using CarShop.Core.Helper.Exceptions.Azure;
using CarShop.Core.Helper.Identity;
using CarShop.Core.Repositories;
using CarShop.Core.Services;
using CarShop.WebAPI.Helper.Exceptions.Security;
using CarShop.WebAPI.Models.Security.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Services.Handlers
{
    public class AuthenticationServiceDefault : IAuthenticationService
    {
        private readonly IConfiguration config;
        private readonly CarShopDbContext dbContext;
        private readonly IUserRepository userRepository;
        private readonly IUserRefreshTokenRepository refreshTokenRepository;
        private readonly IBlobStorage storage;

        public AuthenticationServiceDefault(IConfiguration config, CarShopDbContext dbContext, IUserRepository userRepository, IUserRefreshTokenRepository refreshTokenRepository, IBlobStorage storage)
        {
            this.config = config;
            this.dbContext = dbContext;
            this.userRepository = userRepository;
            this.refreshTokenRepository = refreshTokenRepository;
            this.storage = storage;
        }


        public async Task<AuthenticationModel> SignInAsync(SignInRequestModel model)
        {
            if ((await userRepository.FindByUsernameAsync(model.Username)) is Users user
                && PasswordHasher.VerifyHashedPassword(user.PasswordHash, model.Password))
            {
                var refreshToken = CreateRefreshToken(user);

                await refreshTokenRepository.InsertAsync(refreshToken);
                await dbContext.SaveChangesAsync();

                return new AuthenticationModel()
                {
                    Username = user.Username,

                    Name = user.Name,
                    Department = "Some department",
                    Photo = Convert.ToBase64String(await GetUserImage(user.Username)),

                    Token = CreateJwtToken(user),
                    RefreshToken = refreshToken.Token,
                    RefreshTokenExpiration = refreshToken.Expiration
                };
            }
            throw new InvalidAuthenticationException();
        }

        public async Task<AuthenticationModel> RefreshTokenAsync(RefreshTokenRequestModel model)
        {
            var refreshToken = await refreshTokenRepository.FindByUsernameAndTokenAsync(model.Username, model.RefreshToken);
            if (refreshToken == null)
            {
                throw new RefreshTokenNotFoundException();
            }
            else if (!refreshToken.IsActive)
            {
                throw new InvalidRefreshTokenException();
            }

            using var transaction = dbContext.Database.BeginTransaction();
            try
            {
                await refreshTokenRepository.RevokeAsync(refreshToken);

                refreshToken = CreateRefreshToken(refreshToken.User);
                await refreshTokenRepository.InsertAsync(refreshToken);

                await dbContext.SaveChangesAsync();
                await transaction.CommitAsync();

                return new AuthenticationModel()
                {
                    Username = refreshToken.User.Username,

                    Name = refreshToken.User.Name,
                    Department = "Some department",
                    Photo = Convert.ToBase64String(await GetUserImage(refreshToken.User.Username)),

                    Token = CreateJwtToken(refreshToken.User),
                    RefreshToken = refreshToken.Token,
                    RefreshTokenExpiration = refreshToken.Expiration
                };
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public Task SignOutAsync()
        {
            throw new NotImplementedException();
        }


        private string CreateJwtToken(Users user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor()
            {
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Key"])),
                    SecurityAlgorithms.HmacSha256
                ),

                Subject = new ClaimsIdentity(
                    new Claim[] {
                        new Claim("uid", user.ID.ToString()),
                        new Claim(ClaimTypes.NameIdentifier, user.Username)
                    }
                ),
                Issuer = config["JWT:Issuer"],
                Audience = config["JWT:Audience"],

                Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(config["JWT:DurationInMinutes"]))
            });

            return tokenHandler.WriteToken(token);
        }

        private UserRefreshTokens CreateRefreshToken(Users user)
        {
            var randomNumber = RandomNumberGenerator.GetBytes(32);

            return dbContext.CreateProxy<UserRefreshTokens>(x =>
            {
                x.UserID = user.ID;
                x.User = user;
                x.Token = Convert.ToBase64String(randomNumber);
                x.Expiration = DateTime.UtcNow.AddDays(Convert.ToInt32(config["JWT:RefreshTokenExpiration"]));
                x.Created = DateTime.UtcNow;
            });
        }

        private async Task<byte[]> GetUserImage(string username)
        {
            try
            {
                return await storage.GetAsync("easy-wallet-profile-pictures", username);
            }
            catch (NotFoundException)
            {
                return await storage.GetAsync("easy-wallet-profile-pictures", "_default");
            }
            catch (Azure.RequestFailedException)
            {
                return Array.Empty<byte>();
            }
        }
    }
}