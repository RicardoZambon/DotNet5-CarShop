using System.IO;
using System.Threading.Tasks;

namespace CarShop.Core.Services
{
    public interface IBlobStorage
    {
        Task<byte[]> GetAsync(string container, string blobName);

        Task StoreAsync(string container, string blobName, Stream stream);
    }
}