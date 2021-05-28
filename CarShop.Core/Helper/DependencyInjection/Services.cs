using CarShop.Core.Services;
using CarShop.Core.Services.Handlers;
using Microsoft.Extensions.DependencyInjection;

namespace CarShop.Core.Helper.DependencyInjection
{
    public static class Services
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            return services
                .AddSingleton<IBlobStorage, BlobStorageDefault>();
        }
    }
}