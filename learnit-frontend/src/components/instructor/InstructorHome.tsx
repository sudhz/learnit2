import { Typography, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCoursesByInstructorId } from "../../services/api/courseService";
import Course from "../../model/course";
import useLocalStorage from "../../services/hooks/useLocalStorage";
import CourseCard from "../CourseCard";

const InstructorHome = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const navigate = useNavigate();
  const { getItem } = useLocalStorage("user");
  const id = getItem()?.id;
  useEffect(() => {
    const fetchCoursesByInstructor = async () => {
      try {
        const data = await GetCoursesByInstructorId(id);
        setCourses(data);
      } catch (error) {
        console.error(`Error fetching courses: ${error}`);
      }
    };
    fetchCoursesByInstructor();
  }, [id]);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Welcome to Learnit!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Embark on the journey to the future of learning, where the fusion of
            convenience and innovation awaits. Our platform is brimming with a
            vast array of online courses, meticulously crafted to elevate your
            skills, broaden your knowledge, and pave the way for new
            opportunities. Whether your aspirations are to advance in your
            professional life, explore new passions, or simply acquire new
            knowledge, we are here to support you every step of the way.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: "20px" }}
            onClick={() => navigate("/instructor/coursebuilder")}
          >
            Start a New Course
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://gcdnb.pbrd.co/images/KBJVKYikXoQ8.png?o=1"
            alt="Welcome Image"
            style={{ width: "60%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12}>
          {courses
            ? !!courses.length && (
                <>
                  <Typography variant="h5" gutterBottom>
                    My Courses
                  </Typography>
                  <Grid container spacing={2}>
                    {courses.slice(0, 3).map((course, idx) => (
                      <Grid
                        item
                        key={idx}
                        md={4}
                        xs={8}
                        sm={8}
                        alignItems="center"
                      >
                        <CourseCard
                          id={course.courseId}
                          linkTo={`/instructor/course/${course.courseId}/module`}
                          title={course.courseName}
                          description={course.courseDescription}
                          imgUrl={course.imgUrl}
                          includePrice={false}
                          price={course.price}
                          createdAt={new Date(course.createdAt)}
                          showProgress={false}
                          progress={course.progress}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    style={{ marginTop: "20px" }}
                    onClick={() => navigate("/instructor/courses")}
                  >
                    Show More
                  </Button>
                </>
              )
            : "Loading the courses..."}
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorHome;
function getItem() {
  throw new Error("Function not implemented.");
}
