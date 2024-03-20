import { useEffect, useState } from "react";
import CourseCard from "../CourseCard";
import { Grid, Typography } from "@mui/material";
import Course from "../../model/course";
import { GetCoursesByStudentId } from "../../services/api/courseService";

const StudentCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const fetchCoursesByStudentId = async () => {
      try {
        const data = await GetCoursesByStudentId(2);
        setCourses(data);
      } catch (error) {
        console.error(`Error fetching courses: ${error}`);
      }
    };
    fetchCoursesByStudentId();
  }, []);

  return (
    <>
      <Typography
        variant="h5"
        color="text.secondary"
        marginInlineStart={1}
        marginTop={5}
        marginBottom={2}
      >
        Explore all the courses
      </Typography>
      {courses ? (
        <Grid container spacing={2}>
          {courses.map((course, idx) => (
            <Grid item key={idx} md={4} xs={8} sm={8} alignItems="center">
              <CourseCard
                id={course.courseId}
                title={course.courseName}
                description={course.courseDescription}
                imgUrl={course.imgUrl}
                price={course.price}
                createdAt={new Date(course.createdAt)}
                showProgress={true}
                progress={50}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default StudentCourses;
