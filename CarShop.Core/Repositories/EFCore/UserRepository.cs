using CarShop.Core.BusinessEntities.Security;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories.EFCore
{
    public class UserRepository : IUserRepository
    {
        private readonly CarShopDbContext dbContext;

        public UserRepository(CarShopDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public async Task<Users> FindByUsernameAsync(string username)
        {
            return await dbContext.Set<Users>().FirstOrDefaultAsync(u => u.Username.ToUpper() == username);
        }

        //public async Task CreateAsync(Users user, string password)
        //{
        //    if (password == null)
        //    {
        //        throw new ArgumentNullException(nameof(password));
        //    }

        //    user.PasswordHash = PasswordHasher.HashPassword(password);
        //    await context.Set<Users>().AddAsync(user);
        //}

        //public async Task DeleteAsync(Users user)
        //{
        //    await Task.Run(() =>
        //    {
        //        user.IsDeleted = true;
        //    });
        //}

        //public async Task<Users> FindByIdAsync(int id)
        //{
        //    return await context.Set<Users>().FirstOrDefaultAsync(u => u.ID == id);
        //}

        //public async Task UpdateAsync(Users user)
        //{
        //    await Task.Run(() =>
        //    {
        //        context.Set<Users>().Update(user);
        //    });
        //}

        //public async Task UpdateUserPassword(Users user, string oldPassword, string newPassword)
        //{
        //    if (newPassword == null)
        //    {
        //        throw new ArgumentNullException(nameof(newPassword));
        //    }

        //    if (PasswordHasher.VerifyHashedPassword(user.PasswordHash, oldPassword))
        //    {
        //        await Task.Run(() =>
        //        {
        //            user.PasswordHash = PasswordHasher.HashPassword(newPassword);
        //            context.Set<Users>().Update(user);
        //        });
        //    }
        //}
    }
}