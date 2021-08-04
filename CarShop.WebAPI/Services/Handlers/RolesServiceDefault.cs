using AutoMapper;
using AutoMapper.QueryableExtensions;
using CarShop.Core;
using CarShop.Core.BusinessEntities.Security;
using CarShop.Core.Helper;
using CarShop.Core.Repositories;
using CarShop.WebAPI.Models.Security.Roles;
using ClosedXML.Excel;
using CsvHelper;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.WebAPI.Services.Handlers
{
    public class RolesServiceDefault : IRolesService
    {
        private readonly CarShopDbContext context;
        private readonly IMapper mapper;
        private readonly IRolesRepository rolesRepository;

        public RolesServiceDefault(CarShopDbContext context, IMapper mapper, IRolesRepository rolesRepository)
        {
            this.context = context;
            this.mapper = mapper;
            this.rolesRepository = rolesRepository;
        }

        public IQueryable<RoleListModel> GetAllRoles(int startRow, int endRow, QueryParameters parameters = null)
            => rolesRepository.GetAll(startRow, endRow, parameters).ProjectTo<RoleListModel>(mapper.ConfigurationProvider);

        public async Task<byte[]> ExportAllRolesToCSV(QueryParameters parameters = null)
        {
            await using var memory = new MemoryStream();
            await using var stw = new StreamWriter(memory);
            await using var csv = new CsvWriter(stw, CultureInfo.InvariantCulture);

            await csv.WriteRecordsAsync(rolesRepository.GetAll(parameters).ProjectTo<RoleListModel>(mapper.ConfigurationProvider));

            await csv.FlushAsync();
            await stw.FlushAsync();

            return memory.ToArray();
        }

        public async Task<byte[]> ExportAllRolesToXLSX(QueryParameters parameters = null)
        {
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Users");

            // Title
            worksheet.Cell(1, 1).Value = nameof(Roles);

            var currentRow = 2;
            worksheet.Cell(currentRow, 1).Value = "Id";
            worksheet.Cell(currentRow, 2).Value = "Name";

            var roles = rolesRepository.GetAll(parameters).ProjectTo<RoleListModel>(mapper.ConfigurationProvider);

            foreach (var role in roles)
            {
                currentRow++;
                worksheet.Cell(currentRow, 1).Value = role.Id;
                worksheet.Cell(currentRow, 2).Value = role.Name;
            }

            // Creates Table
            var rngTable = worksheet.Range($"A1:B{currentRow}");
            rngTable.Style.Border.BottomBorder = XLBorderStyleValues.Thin;
            rngTable.Style.Border.OutsideBorder = XLBorderStyleValues.Thick;

            // Title
            rngTable.Cell(1, 1).Style.Font.Bold = true;
            rngTable.Cell(1, 1).Style.Fill.BackgroundColor = XLColor.CornflowerBlue;
            rngTable.Cell(1, 1).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            rngTable.Range("A1:B1").Merge();

            // Format Headers
            var rngHeaders = rngTable.Range("A2:B2");
            rngHeaders.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            rngHeaders.Style.Font.Bold = true;
            rngHeaders.Style.Fill.BackgroundColor = XLColor.LightSkyBlue;

            // Creates Excel Table
            var rngData = worksheet.Range($"A2:B{currentRow}");
            var excelTable = rngData.CreateTable();

            await using var memory = new MemoryStream();
            workbook.SaveAs(memory);

            return memory.ToArray();
        }

        public async Task<string> GetRoleDisplayNameAsync(int roleId)
        {
            return await this.rolesRepository.GetDisplayNameAsync(roleId);
        }


        public async Task DeleteRolesAsync(int[] roleIds)
        {
            using var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                await rolesRepository.DeleteAsync(roleIds);
                await context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<RoleEditResponse> UpdateRoleAsync(int roleId, RoleEditModel roleModel)
        {
            using var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                await rolesRepository.UpdateAsync(mapper.Map(roleModel, await rolesRepository.GetAsync(roleId)));
                await context.SaveChangesAsync();

                await transaction.CommitAsync();

                return await GetEditRoleAsync(roleId);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<RoleEditResponse> InsertRoleAsync(RoleEditModel roleModel)
        {
            using var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                var role = mapper.Map<Roles>(roleModel);

                await rolesRepository.InsertAsync(role);
                await context.SaveChangesAsync();

                await transaction.CommitAsync();

                return await GetEditRoleAsync(role.ID);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }


        public async Task<RoleEditModel> GetRoleAsync(int roleId)
            => mapper.Map<RoleEditModel>(await rolesRepository.GetAsync(roleId));

        protected async Task<RoleEditResponse> GetEditRoleAsync(int roleId)
            => mapper.Map<RoleEditResponse>(await rolesRepository.GetAsync(roleId));
    }
}