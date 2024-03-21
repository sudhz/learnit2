import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box height="60vh" sx={{ padding: 2, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Learnit
      </Typography>
      <Typography variant="body1" gutterBottom>
        Explore our wide range of courses and enhance your learning experience.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/courses"
        sx={{ marginTop: 2 }}
      >
        Browse All Courses
      </Button>
    </Box>
  );
};

export default HomePage;
