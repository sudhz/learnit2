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

    [HttpPost]
    public async Task<ActionResult<Course>> CreateCourse(Course course)
    {
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Course), new { id = course.CourseId }, course);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, Course course)
    {
        if (id != course.CourseId)
        {
            return BadRequest();
        }

        _context.Entry(course).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        Console.WriteLine(course.CourseName.ToString());
        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Course>> GetCourse(int id)
    {
        var course = await _context.Courses.FindAsync(id);

        if (course == null)
        {
            return NotFound();
        }

        return course;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null)
        {
            return NotFound();
        }

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}/description")]
    public async Task<IActionResult> UpdateCourseDescription(int id, [FromBody] JsonElement payload)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null)
        {
            return NotFound();
        }

        string UDescription = payload.GetProperty("UDescription").ToString();
        course.CourseDescription = UDescription;
        _context.Entry(course).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent(); // Return a 204 No Content status code to indicate success
    }

    private bool CourseExists(int id)
    {
        return _context.Courses.Any(e => e.CourseId == id);
    }
}