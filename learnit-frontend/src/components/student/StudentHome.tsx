import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentHome = () => {
  const navigate = useNavigate();
  const backgroundStyle = {
    backgroundImage: `url("https://asset.gecdesigns.com/img/background-templates/isometric-e-learning-background-template-1612282245987-cover.webp")`, // Replace with your actual image URL
    backgroundSize: "actual",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "60vh",
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
            Welcome
          </Typography>
          <Typography variant="body1" gutterBottom>
            Here you can find all the resources that need to update yourself
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/student/courses")}
          >
            Start Learning
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default StudentHome;
