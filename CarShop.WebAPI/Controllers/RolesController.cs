using CarShop.Core.Helper;
using CarShop.Core.Helper.Exceptions;
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


        [HttpPost]
        public ActionResult<IQueryable<RoleListModel>> List(int startRow, int endRow, [FromBody] QueryParameters parameters = null)
        {
            try
            {
                return Ok(rolesService.GetAllRoles(startRow, endRow, parameters));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(Export) + "/{option}")]
        public async Task<ActionResult<byte[]>> Export(string option, [FromBody] QueryParameters parameters = null)
        {
            try
            {
                return option switch
                {
                    "csv" => File(await rolesService.ExportAllRolesToCSV(parameters), "text/csv", "usuarios.csv"),
                    "xlsx" => File(await rolesService.ExportAllRolesToXLSX(parameters), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "usuarios.xlsx"),
                    _ => NotFound(),
                };
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route(nameof(Title) + "/{roleId}")]
        public async Task<ActionResult<string>> Title(int roleId)
        {
            try
            {
                return Ok(await rolesService.GetRoleDisplayNameAsync(roleId));
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
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
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}