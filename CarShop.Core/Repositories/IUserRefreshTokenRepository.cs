using CarShop.Core.BusinessEntities.Security;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories
{
    public interface IUserRefreshTokenRepository
    {
        Task InsertAsync(UserRefreshTokens token);

        Task RevokeAsync(UserRefreshTokens token);

        Task<UserRefreshTokens> FindByUsernameAndTokenAsync(string username, string refreshToken);
    }
}