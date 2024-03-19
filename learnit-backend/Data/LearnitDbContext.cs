// using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Configuration;
using learnit_backend.Models;

namespace learnit_backend.Data;

public partial class LearnitDbContext : DbContext
{
    public LearnitDbContext()
    {
    }

    public LearnitDbContext(DbContextOptions<LearnitDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Instructor> Instructors { get; set; }

    public virtual DbSet<Lecture> Lectures { get; set; }

    public virtual DbSet<Module> Modules { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:DefaultConnection");


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__category__D54EE9B42FA7C4AB");

            entity.ToTable("category");

            entity.Property(e => e.CategoryId)
                .UseIdentityColumn()
                .HasColumnName("category_id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(255)
                .HasColumnName("category_name");

            entity.HasMany(d => d.Courses).WithMany(p => p.Categories)
                .UsingEntity<Dictionary<string, object>>(
                    "CategoryCourse",
                    r => r.HasOne<Course>().WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__category___cours__4BAC3F29"),
                    l => l.HasOne<Category>().WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__category___categ__4AB81AF0"),
                    j =>
                    {
                        j.HasKey("CategoryId", "CourseId").HasName("PK__category__2DBF06CE10FF449A");
                        j.ToTable("category_course");
                        j.IndexerProperty<int>("CategoryId").HasColumnName("category_id");
                        j.IndexerProperty<int>("CourseId").HasColumnName("course_id");
                    });
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__course__8F1EF7AE1A2BE3E7");

            entity.ToTable("course");

            entity.Property(e => e.CourseId)
                .UseIdentityColumn()
                .HasColumnName("course_id");
            entity.Property(e => e.CourseDescription)
                .HasColumnType("text")
                .HasColumnName("course_description");
            entity.Property(e => e.CourseName)
                .HasMaxLength(255)
                .HasColumnName("course_name");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(255)
                .HasColumnName("img_url");
            entity.Property(e => e.InstructorId).HasColumnName("instructor_id");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");

            entity.HasOne(d => d.Instructor).WithMany(p => p.Courses)
                .HasForeignKey(d => d.InstructorId)
                .HasConstraintName("FK__course__instruct__46E78A0C");

            entity.HasMany(d => d.Modules).WithMany(p => p.Courses)
                .UsingEntity<Dictionary<string, object>>(
                    "CourseModule",
                    r => r.HasOne<Module>().WithMany()
                        .HasForeignKey("ModuleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__course_mo__modul__49C3F6B7"),
                    l => l.HasOne<Course>().WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__course_mo__cours__48CFD27E"),
                    j =>
                    {
                        j.HasKey("CourseId", "ModuleId").HasName("PK__course_m__AEBC27CB540B2C50");
                        j.ToTable("course_module");
                        j.IndexerProperty<int>("CourseId").HasColumnName("course_id");
                        j.IndexerProperty<int>("ModuleId").HasColumnName("module_id");
                    });
        });

        modelBuilder.Entity<Instructor>(entity =>
        {
            entity.HasKey(e => e.InstructorId).HasName("PK__instruct__A1EF56E8D02644F4");

            entity.ToTable("instructor");

            entity.Property(e => e.InstructorId)
                .UseIdentityColumn()
                .HasColumnName("instructor_id");
            entity.Property(e => e.Bio)
                .HasMaxLength(255)
                .HasColumnName("bio");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.InstructorName)
                .HasMaxLength(255)
                .HasColumnName("instructor_name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Lecture>(entity =>
        {
            entity.HasKey(e => e.LectureId).HasName("PK__lecture__797827F59DDB2F45");

            entity.ToTable("lecture");

            entity.Property(e => e.LectureId)
                .UseIdentityColumn()
                .HasColumnName("lecture_id");
            entity.Property(e => e.LectureDuration).HasColumnName("lecture_duration");
            entity.Property(e => e.LectureName)
                .HasMaxLength(255)
                .HasColumnName("lecture_name");
            entity.Property(e => e.LectureUrl)
                .HasMaxLength(255)
                .HasColumnName("lecture_url");
            entity.Property(e => e.ModuleId).HasColumnName("module_id");

            entity.HasOne(d => d.Module).WithMany(p => p.Lectures)
                .HasForeignKey(d => d.ModuleId)
                .HasConstraintName("FK__lecture__module___47DBAE45");
        });

        modelBuilder.Entity<Module>(entity =>
        {
            entity.HasKey(e => e.ModuleId).HasName("PK__module__1A2D0653AC97335C");

            entity.ToTable("module");

            entity.Property(e => e.ModuleId)
                .UseIdentityColumn()
                .HasColumnName("module_id");
            entity.Property(e => e.ModuleDuration).HasColumnName("module_duration");
            entity.Property(e => e.ModuleName)
                .HasMaxLength(255)
                .HasColumnName("module_name");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__student__2A33069A8C838A0C");

            entity.ToTable("student");

            entity.Property(e => e.StudentId)
                .UseIdentityColumn()
                .HasColumnName("student_id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("student_name");

            entity.HasMany(d => d.Courses).WithMany(p => p.Students)
                .UsingEntity<Dictionary<string, object>>(
                    "StudentCourse",
                    r => r.HasOne<Course>().WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__student_c__cours__4D94879B"),
                    l => l.HasOne<Student>().WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__student_c__stude__4CA06362"),
                    j =>
                    {
                        j.HasKey("StudentId", "CourseId").HasName("PK__student___D2C2E9E06D082D01");
                        j.ToTable("student_course");
                        j.IndexerProperty<int>("StudentId").HasColumnName("student_id");
                        j.IndexerProperty<int>("CourseId").HasColumnName("course_id");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
