using CarShop.WebAPI.Models.Security.Roles;
using CarShop.WebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace CarShop.WebAPI.Controllers
{
    [ApiController, Route("Security/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly IRolesService rolesService;

        public RolesController(IRolesService rolesService)
        {
            this.rolesService = rolesService;
        }

        [HttpGet]
        public ActionResult<IQueryable<RoleListModel>> Get(int startRow, int endRow)
        {
            try
            {
                return Ok(rolesService.GetAllRoles(startRow, endRow));
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}