using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;

namespace learnit_backend.Models // Adjust the namespace according to your project structure
{
    public class Student
    {

        // private string _password;
        // Primary key
        public int StudentId { get; set; }

        // Column name will be "name" in the database
        [Column("student_name")]
        public required string Name { get; set; }

        // Column name will be "email" in the database
        [Column("email")]
        public required string Email { get; set; }

        // Column name will be "phone" in the database
        [Column("phone")]
        public required string Phone { get; set; }

        // Column name will be "password" in the database
        [Column("password")]
        public required string Password {get; set;}
        
        public virtual ICollection<Course> Courses { get; set; } = [];

        // public void SetPassword(string password)
        // {
        //     using (var sha256 = SHA256.Create())
        //     {
        //         var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        //         Password = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        //     }
        // } // student.Password = "abc"
    }
}
