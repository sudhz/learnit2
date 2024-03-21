import React from "react";
import { Box, Typography, Button, Container, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InstructorHome = () => {
  const navigate = useNavigate();
  const backgroundStyle = {
    backgroundImage: `url("https://cdn.elearningindustry.com/wp-content/uploads/2022/01/shutterstock_525008128.jpg")`, // Replace with your actual image URL
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh", // Adjust the height as needed
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const contentStyle = {
    margin: "20px",
    padding: "20px",
    border: "1px solid grey",
    borderRadius: "2px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  };

  return (
    <Box sx={backgroundStyle}>
      <Container maxWidth="sm">
        <Box sx={contentStyle}>
          <Typography variant="h4" gutterBottom>
            Welcome to Learnit
          </Typography>
          <Typography variant="body1" gutterBottom>
            Here you can manage all your courses
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/instructor/home/coursebuilder")}
          >
            Browse All Courses
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default InstructorHome;
