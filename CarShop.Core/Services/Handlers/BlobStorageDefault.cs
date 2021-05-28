using Azure.Storage.Blobs;
using System.IO;
using System.Threading.Tasks;

namespace CarShop.Core.Services.Handlers
{
    public class BlobStorageDefault : IBlobStorage
    {
        private readonly BlobServiceClient _blobServiceClient;

        public BlobStorageDefault(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }


        public async Task<byte[]> GetAsync(string container, string blobName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(container).GetBlobClient(blobName);

            using var ms = new MemoryStream();
            await containerClient.DownloadToAsync(ms);
            return ms.ToArray();
        }

        public async Task StoreAsync(string container, string blobName, Stream stream)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(container);

            try
            {
                await containerClient.UploadBlobAsync(blobName, stream);
            }
            catch (Azure.RequestFailedException)
            {
                var blobClient = _blobServiceClient.GetBlobContainerClient(container).GetBlobClient(blobName);
                await blobClient.UploadAsync(stream);
            }
        }
    }
}