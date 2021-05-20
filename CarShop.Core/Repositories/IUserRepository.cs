using CarShop.Core.BusinessEntities.Security;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories
{
    public interface IUserRepository
    {
        Task<Users> FindByUsernameAsync(string username);

        //Task CreateAsync(Users user, string password);

        //Task DeleteAsync(Users user);

        //Task<Users> FindByIdAsync(int id);

        //Task UpdateAsync(Users user);

        //Task UpdateUserPassword(Users user, string oldPassword, string newPassword);
    }
}