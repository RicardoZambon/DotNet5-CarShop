using CarShop.WebAPI.Models.Security.Roles;
using CarShop.WebAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

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

        [HttpGet, Route(nameof(Export) + "/{option}")]
        public async Task<ActionResult<byte[]>> Export(string option)
        {
            try
            {
                switch (option)
                {
                    case "csv":
                        return File(await rolesService.ExportAllRolesToCSV(), "text/csv", "usuarios.csv");
                    case "xlsx":
                        return File(await rolesService.ExportAllRolesToXLSX(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "usuarios.xlsx");
                    default:
                        return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}