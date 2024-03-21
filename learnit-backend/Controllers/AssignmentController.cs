using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
 
namespace Learnit_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly LearnitDbContext _context;
 
        public AssignmentController(LearnitDbContext context)
        {
            _context = context;
        }
 
        [HttpPost]
        public async Task<ActionResult<Assignment>> Post(Assignment assignment)
        {
            _context.Assignment.Add(assignment);
            await _context.SaveChangesAsync();
 
            return CreatedAtAction(nameof(GetAssignment), new { id = assignment.AQuestionId}, assignment);
        }
 
       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assignment>>> GetAssignment()
        {
            var assignment = await _context.Assignment.ToListAsync();
            if (assignment == null || assignment.Count == 0)
            {
                return NotFound();
            }
 
            return assignment;
        }
 
        [HttpGet("{id}")]
        public async Task<ActionResult<Assignment>> GetAssignment(int id)
        {
            var assignment = await _context.Assignment.FindAsync(id);
            if (assignment == null)
            {
                return NotFound();
            }
 
            return assignment;
        }
 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAssignment(int id, Assignment assignment)
        {
            if (id != assignment.AQuestionId)
            {
                return BadRequest();
            }
 
            _context.Entry(assignment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssignment(int id)
        {
            var assignment = await _context.Assignment.FindAsync(id);
            if (assignment == null)
            {
                return NotFound();
            }
 
            _context.Assignment.Remove(assignment);
            await _context.SaveChangesAsync();
 
            return NoContent();
        }
    }
}