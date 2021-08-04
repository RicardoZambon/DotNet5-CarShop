using CarShop.Core.BusinessEntities.Security;
using CarShop.Core.Helper;
using CarShop.Core.Helper.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace CarShop.Core.Repositories.EFCore
{
    public class RolesRepository : IRolesRepository
    {
        private readonly CarShopDbContext context;

        public RolesRepository(CarShopDbContext context)
        {
            this.context = context;
        }


        public IQueryable<Roles> GetAll(QueryParameters parameters = null)
        {
            var list = context.Set<Roles>()
                .AsQueryable();

            if (parameters?.Filters != null)
            {
                var filters = new Dictionary<string, object>(parameters.Filters, StringComparer.InvariantCultureIgnoreCase);

                if (filters.ContainsKey(nameof(Roles.Name)))
                {
                    list = list.Where(x => EF.Functions.Like(x.Name, $"%{filters[nameof(Roles.Name)]}%"));
                }
            }

            if (parameters?.Sort != null)
            {
                var sort = new Dictionary<string, string>(parameters.Sort, StringComparer.InvariantCultureIgnoreCase);

                //Todo
            }

            return list;
        }
        public IQueryable<Roles> GetAll(int startRow, int endRow, QueryParameters parameters = null)
            => GetAll(parameters)
                .Skip(startRow)
                .Take(endRow);
        public async Task<string> GetDisplayNameAsync(int roleId)
            => (await this.GetAsync(roleId)).Name;


        public async Task DeleteAsync(int[] roleIds)
        {
            foreach (var roleId in roleIds)
            {
                var role = await context.Set<Roles>().FindAsync(roleId);
                role.IsDeleted = true;
                context.Update(role);
            }
        }

        public async Task UpdateAsync(Roles role)
        {
            await Task.Run(() =>
            {
                context.Set<Roles>().Update(role);
            });
        }

        public async Task InsertAsync(Roles role)
        {
            await Task.Run(() =>
            {
                context.Set<Roles>().Add(role);
            });
        }


        public async Task<Roles> GetAsync(int roleId)
        {
            var role = await context.Set<Roles>().FindAsync(roleId);
            if (role == null)
            {
                throw new EntityNotFoundException();
            }

            return role;
        }
    }
}