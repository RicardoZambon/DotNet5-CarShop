using CarShop.Core.Services;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace CarShop.WebAPI.Services.Handlers
{
    public class AuditUserProvider : IAuditUserProvider
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public AuditUserProvider(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public int GetUserID()
        {
            return Convert.ToInt32(httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(a => a.Type == "uid")?.Value);
        }
    }
}