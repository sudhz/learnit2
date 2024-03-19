using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class Assignment
{
    public int AQuestionId { get; set; }

    public string AQuestionText { get; set; } = null!;

    public int CourseId { get; set; }

    public virtual Course Course { get; set; } = null!;
}
