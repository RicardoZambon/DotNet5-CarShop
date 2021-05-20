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
                .AddScoped<IUserRepository, UserRepository>()
                .AddScoped<IUserRefreshTokenRepository, UserRefreshTokenRepository>();
        }
    }
}