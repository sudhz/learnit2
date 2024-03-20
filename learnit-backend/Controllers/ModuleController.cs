using System.Text.Json;
using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
 
namespace learnit_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
    public class ModuleController(LearnitDbContext context)  : ControllerBase
    {
        private readonly LearnitDbContext _context=context;
 
        // public ModuleController(LearnitDbContext context)
        // {
        //     _context = context;
        // }
 
        [HttpPost]
        public async Task<ActionResult<Module>> CreateModule(Module module)
        {
            _context.Modules.Add(module);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetModule), new { id = module.ModuleId }, module);
        }
 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateModule(int id, Module module)
        {
            if (id != module.ModuleId)
            {
                return BadRequest();
            }
 
            _context.Entry(module).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            Console.WriteLine(module.ModuleName.ToString());
            return NoContent();
        }
 
        [HttpGet("{id}")]
        public async Task<ActionResult<Module>> GetModule(int id)
        {
            var module = await _context.Modules.FindAsync(id);
 
            if (module == null)
            {
                return NotFound();
            }
 
            return module;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Module>>> GetModules()
        {
            var modules = await _context.Modules.ToListAsync();
 
            if (modules == null || !modules.Any())
            {
                return NotFound();
            }
 
            return modules;
        }
 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModule(int id)
        {
            var module = await _context.Modules.FindAsync(id);
            if (module == null)
            {
                return NotFound();
            }
 
            _context.Modules.Remove(module);
            await _context.SaveChangesAsync();
 
            return NoContent();
        }
 
        private bool ModuleExists(int id)
        {
            return _context.Modules.Any(e => e.ModuleId == id);
        }
    [HttpPut("ModuleEdit/{id}")]
    public async Task<IActionResult> ModuleEdit(int id, [FromBody] JsonElement payload)
    {
        var module = await _context.Modules.FindAsync(id);
        if (module == null)
        {
            return NotFound();
        }
 
        // string UDescription = payload.GetProperty("UDescription").ToString();
        // module.moduleDescription = UDescription;
        _context.Entry(module).State = EntityState.Modified;
        await _context.SaveChangesAsync();
 
        return NoContent(); // Return a 204 No Content status code to indicate success
    }
    }
