using CarShop.Core.Services;
using CarShop.WebAPI.Services;
using CarShop.WebAPI.Services.Handlers;
using Microsoft.Extensions.DependencyInjection;

namespace CarShop.WebAPI.Helper.DependencyInjection
{
    public static class Services
    {
        public static IServiceCollection AddWebAPIServices(this IServiceCollection services)
        {
            return services
                .AddScoped<IMenuService, MenuServiceDefault>()
                .AddScoped<IAuditUserProvider, AuditUserProvider>()
                .AddScoped<IAuditHistoryService, AuditHistoryService>()

                .AddScoped<IAuthenticationService, AuthenticationServiceDefault>()
                .AddScoped<IRolesService, RolesServiceDefault>()
                ;
        }
    }
}