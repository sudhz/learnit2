using Microsoft.AspNetCore.Mvc;
using learnit_backend.Models;
using Microsoft.EntityFrameworkCore;
using learnit_backend.Data;
using Microsoft.AspNetCore.Authorization;

namespace learnit_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class QuizController(LearnitDbContext context) : ControllerBase
    {
        private readonly LearnitDbContext _context = context;

        // GET: api/Quiz/ModuleId
        [HttpGet("{moduleId}")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzesByModuleId(int moduleId)
        {
            var quizzes = await _context.Quizzes
                .Include(q => q.QuizOptions)
                .Where(q => q.ModuleId == moduleId)
                .ToListAsync();

            if (!quizzes.Any())
            {
                return NotFound();
            }

            return quizzes;
        }

    }
}