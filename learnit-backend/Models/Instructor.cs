using System.ComponentModel.DataAnnotations.Schema;


namespace learnit_backend.Models;

public partial class Instructor
{
    [Column("instructor_id")]
    public int InstructorId { get; set; }

    [Column("instructor_name")]
    public string InstructorName { get; set; } = null!;

    [Column("email")]
    public string Email { get; set; } = null!;

    [Column("phone")]
    public string? Phone { get; set; }

    [Column("password")]
    public string Password { get; set; } = null!;

    [Column("bio")]
    public string? Bio { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
