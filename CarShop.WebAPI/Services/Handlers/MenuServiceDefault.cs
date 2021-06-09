using AutoMapper;
using AutoMapper.QueryableExtensions;
using CarShop.Core.Repositories;
using CarShop.WebAPI.Models.Security.Menus;
using System.Linq;

namespace CarShop.WebAPI.Services.Handlers
{
    public class MenuServiceDefault : IMenuService
    {
        private readonly IMenuRepository menuRepository;
        private readonly IMapper mapper;

        public MenuServiceDefault(IMenuRepository menuRepository, IMapper mapper)
        {
            this.menuRepository = menuRepository;
            this.mapper = mapper;
        }


        public IQueryable<MenuResponse> GetAllMenus()
        {
            return menuRepository
                .GetAll()
                .ProjectTo<MenuResponse>(mapper.ConfigurationProvider);
        }
    }
}