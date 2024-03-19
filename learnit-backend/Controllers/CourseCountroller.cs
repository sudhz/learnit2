using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace learnit_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseController(LearnitDbContext context) : ControllerBase
{
    private readonly LearnitDbContext _context = context;

    [HttpGet()]
    public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
    {       
        var courses = await _context.Courses.ToListAsync();

        if (courses == null || !courses.Any())
        {
            return NotFound();
        }

        return Ok(courses);
    }

}
