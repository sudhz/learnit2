using System.Text.Json;
using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
 
namespace learnit_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
    public class LectureController(LearnitDbContext context) : ControllerBase
    {
        private readonly LearnitDbContext _context=context;
 
        // public LectureController(LearnitDbContext context)
        // {
        //     _context = context;
        // }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lecture>>> GetLectures()
        {
            var lectures = await _context.Lectures.ToListAsync();
 
            if (lectures== null || !lectures.Any())
            {
                return NotFound();
            }
 
            return Ok(lectures);
        }
 
        [HttpPost]
        public async Task<ActionResult<Lecture>> CreateLecture(Lecture lecture)
        {
            _context.Lectures.Add(lecture);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Lecture), new { id = lecture.LectureId }, lecture);
        }
 
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLecture(int id, Lecture lecture)
        {
            if (id != lecture.LectureId)
            {
                return BadRequest();
            }
 
            _context.Entry(lecture).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            Console.WriteLine(lecture.LectureName.ToString());
            return NoContent();
        }
 
        [HttpGet("{id}")]
        public async Task<ActionResult<Lecture>> GetLecture(int id)
        {
            var lecture = await _context.Lectures.FindAsync(id);
 
            if (lecture == null)
            {
                return NotFound();
            }
 
            return lecture;
        }
        
 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLecture(int id)
        {
            var lecture = await _context.Lectures.FindAsync(id);
            if (lecture == null)
            {
                return NotFound();
            }
 
            _context.Lectures.Remove(lecture);
            await _context.SaveChangesAsync();
 
            return NoContent();
        }
        
 
        private bool LectureExists(int id)
        {
            return _context.Lectures.Any(e => e.LectureId == id);
        }
    [HttpPut("LectureEdit/{id}")]
    public async Task<IActionResult> LectureEdit(int id, [FromBody] JsonElement payload)
    {
        var lecture = await _context.Lectures.FindAsync(id);
        if (lecture == null)
        {
            return NotFound();
        }
 
        // string UDescription = payload.GetProperty("UDescription").ToString();
        // module.moduleDescription = UDescription;
        _context.Entry(lecture).State = EntityState.Modified;
        await _context.SaveChangesAsync();
 
        return NoContent(); // Return a 204 No Content status code to indicate success
    }
    }
