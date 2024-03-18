using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace learnit_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class CourseController(LearnitDbContext context) : ControllerBase
{
    private readonly LearnitDbContext _context = context;

    [HttpGet()]
    public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
    {
        // to get the modules in each course and the student ids

        //var courses = await _context.Courses
        //     .Select(c => new
        //     {
        //         CourseId = c.CourseId,
        //         CourseName = c.CourseName,
        //         CourseDescription = c.CourseDescription,
        //         ImgUrl = c.ImgUrl,
        //         Price = c.Price,
        //         CreatedAt = c.CreatedAt,
        //         InstructorId = c.InstructorId,
        //         Categories = c.Categories.Select(cat => cat.CategoryId).ToList(),
        //         Modules = c.Modules,
        //         Students = c.Students.Select(student => student.StudentId).ToList(),
        //     })
        //     .ToListAsync();
        
        var courses = await _context.Courses.ToListAsync();

        if (courses == null || !courses.Any())
        {
            return NotFound();
        }

        return Ok(courses);
    }

}
