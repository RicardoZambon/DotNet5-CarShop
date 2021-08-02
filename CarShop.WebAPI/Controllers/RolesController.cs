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
        public ActionResult<IQueryable<RoleListModel>> List(int startRow, int endRow)
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
                return option switch
                {
                    "csv" => File(await rolesService.ExportAllRolesToCSV(), "text/csv", "usuarios.csv"),
                    "xlsx" => File(await rolesService.ExportAllRolesToXLSX(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "usuarios.xlsx"),
                    _ => NotFound(),
                };
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet, Route(nameof(Title) + "/{roleId}")]
        public async Task<ActionResult<string>> Title(int roleId)
        {
            try
            {
                return Ok(await rolesService.GetRoleDisplayNameAsync(roleId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(int[] roleIds)
        {
            try
            {
                await rolesService.DeleteRolesAsync(roleIds);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route("{roleId}")]
        public async Task<IActionResult> Update(int roleId, RoleEditModel roleModel)
        {
            try
            {
                return Ok(await rolesService.UpdateRoleAsync(roleId, roleModel));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Insert(RoleEditModel roleModel)
        {
            try
            {
                return Ok(await rolesService.InsertRoleAsync(roleModel));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet, Route("{roleId}")]
        public async Task<ActionResult<RoleEditModel>> Get(int roleId)
        {
            try
            {
                return Ok(await rolesService.GetRoleAsync(roleId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}