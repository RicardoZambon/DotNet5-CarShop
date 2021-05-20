using CarShop.Core.BusinessEntities.Security;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories.EFCore
{
    public class UserRefreshTokenRepository : IUserRefreshTokenRepository
    {

        private readonly CarShopDbContext dbContext;

        public UserRefreshTokenRepository(CarShopDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public async Task InsertAsync(UserRefreshTokens token)
        {
            await dbContext.Set<UserRefreshTokens>().AddAsync(token);
        }

        public async Task RevokeAsync(UserRefreshTokens token)
        {
            token.Revoked = DateTime.UtcNow;
            await Task.Run(() => { dbContext.Set<UserRefreshTokens>().Update(token); });
        }


        public async Task<UserRefreshTokens> FindByUsernameAndTokenAsync(string username, string refreshToken)
        {
            return await dbContext.Set<UserRefreshTokens>().FirstOrDefaultAsync(t => t.User.Username.ToUpper() == username && t.Token == refreshToken);
        }
    }
}