using AutoMapper;
using AutoMapper.QueryableExtensions;
using CarShop.Core.Repositories;
using CarShop.WebAPI.Models.Security.Roles;
using System.Linq;

namespace CarShop.WebAPI.Services.Handlers
{
    public class RolesServiceDefault : IRolesService
    {
        private readonly IMapper mapper;
        private readonly IRolesRepository rolesRepository;

        public RolesServiceDefault(IMapper mapper, IRolesRepository rolesRepository)
        {
            this.mapper = mapper;
            this.rolesRepository = rolesRepository;
        }

        public IQueryable<RoleListModel> GetAllRoles(int startRow, int endRow)
            => rolesRepository.GetAll(startRow, endRow).ProjectTo<RoleListModel>(mapper.ConfigurationProvider);
    }
}
