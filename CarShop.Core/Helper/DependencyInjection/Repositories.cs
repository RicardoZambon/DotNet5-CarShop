using CarShop.Core.Repositories;
using CarShop.Core.Repositories.EFCore;
using Microsoft.Extensions.DependencyInjection;

namespace CarShop.Core.Helper.DependencyInjection
{
    public static class Repositories
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            return services
                .AddScoped<IUserRefreshTokenRepository, UserRefreshTokenRepository>()
                .AddScoped<IMenuRepository, MenuRepository>()
                .AddScoped<IAuditHistoryRepository, AuditHistoryRepository>()

                .AddScoped<IRolesRepository, RolesRepository>()
                .AddScoped<IUserRepository, UserRepository>()
                ;
        }
    }
}