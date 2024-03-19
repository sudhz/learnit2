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

    [HttpGet("{courseId}/top-courses")]
    public async Task<IActionResult> GetTopCourses(int courseId)
    {
        try
        {
            var studentIdsWithCourse = await _context.StudentCourses
                .Where(sc => sc.CourseId == courseId)
                .Select(sc => sc.StudentId)
                .ToListAsync();

            var topCourses = await _context.StudentCourses
                .Where(sc => studentIdsWithCourse.Contains(sc.StudentId) && sc.CourseId != courseId)
                .GroupBy(sc => sc.CourseId)
                .OrderByDescending(group => group.Count())
                .Take(3)
                .Select(group => group.Key)
                .ToListAsync();

            var courses = await _context.Courses
                .Where(c => topCourses.Contains(c.CourseId))
                .ToListAsync();

            return Ok(courses);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}
