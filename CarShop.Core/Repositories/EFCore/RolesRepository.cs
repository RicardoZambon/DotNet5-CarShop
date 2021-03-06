﻿using CarShop.Core.BusinessEntities.Security;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.Core.Repositories.EFCore
{
    public class RolesRepository : IRolesRepository
    {
        private readonly CarShopDbContext context;

        public RolesRepository(CarShopDbContext context)
        {
            this.context = context;
        }


        public IQueryable<Roles> GetAll()
            => context.Set<Roles>()
                .AsQueryable();

        public IQueryable<Roles> GetAll(int startRow, int endRow)
            => GetAll()
                .Skip(startRow)
                .Take(endRow);


        public async Task DeleteAsync(int[] roleIds)
        { 
            foreach (var roleId in roleIds)
            {
                var role = await context.Set<Roles>().FindAsync(roleId);
                role.IsDeleted = true;
                context.Update(role);
            }
        }
    }
}