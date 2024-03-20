
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Button, 
  Card, 
  Container, 
  Typography, 
  Grid,
  IconButton
} from "@mui/material";
import { AccessTimeFilled as AccessTimeFilledIcon } from "@mui/icons-material";
import axios from "axios";
interface Module {
  id: number;
  title: string;
  duration: string;
}
const CourseLandingPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [description, setDescription] = useState("");
  const [name_v, setName] = useState("");
  const [modules, setModules] = useState<Module[]>([
    { id: 1, title: "Module 1", duration: "30 mins" },
    { id: 2, title: "Module 2", duration: "45 mins" },
    { id: 3, title: "Module 3", duration: "50 mins" },
    { id: 4, title: "Module 4", duration: "35 mins" },
    { id: 5, title: "Module 5", duration: "55 mins" },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:5110/api/course/${id}`
        );
        console.log(courseResponse.data)
        setDescription(courseResponse.data.courseDescription);
        setName(courseResponse.data.courseName);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <Container maxWidth="md">
      <Typography
        variant="h5"
        align="center"
        color="primary"
        sx={{ color: "#3498db", fontWeight: "bold" }}
      >
        COURSE LANDING PAGE
      </Typography>
      <br />
      <br />
      <Card
        sx={{
          background: "rgba(175, 219, 245, 1)",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 10px",
          height: "10%",
        }}
      >
        <div style={{ flex: 1, marginRight: "40px", fontWeight: "bold" }}>
          <Typography variant="h5">{name_v}</Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <AccessTimeFilledIcon sx={{ color: "#3498db" }} />
          <span style={{ marginLeft: "5px" }}>2 Hours</span>
          <Link to="/Payment" style={{ marginLeft: "10px" }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "5px",
                background: "#3498db",
                color: "white",
                padding: "12px",
                cursor: "pointer",
              }}
            >
              ORDER NOW
            </Button>
          </Link>
        </div>
      </Card>
      <br />
      <br />
      <div>
        <br />
        <br />
        <Typography
          variant="h5"
          align="center"
          color="primary"
          sx={{ color: "#3498db", fontWeight: "bold" }}
        >
          Course Descripton
        </Typography>
        <Card
          sx={{
            background: "rgba(175, 219, 245, 1)",
            padding: "20px",
            borderRadius: "10px",
            margin: "25px 50px",
            color: "#3498db",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "10px",
              fontWeight: "bold",
              background: "white",
            }}
          >
            {description}
            {/* <strong>Key Features:</strong>
                  <ul>
                    <li>
                      Expert-led instruction: Learn from industry professionals
                      and experienced educators.
                    </li>
                    <li>
                      Flexible learning: Access courses at your own pace,
                      anytime, and from anywhere.
                    </li>
                    <li>
                      Engaging content: Interactive lessons, real-world
                      projects, and assessments to reinforce learning.
                    </li>
                    <li>
                      Comprehensive curriculum: Covering essential topics and
                      the latest advancements in the field.
                    </li>
                    <li>
                      Community support: Connect with peers, share insights, and
                      collaborate on projects.
                    </li>
                  </ul> */}
          </Typography>
        </Card>
      </div>
      <br />
      <br />
      <Typography
        variant="h5"
        align="center"
        color="primary"
        sx={{ color: "#3498db", fontWeight: "bold" }}
      >
        Course Curriculum
      </Typography>
      <Card
        sx={{
          background: "rgba(175, 219, 245, 1)",
          padding: "20px",
          borderRadius: "10px",
          margin: "25px 50px",
          color: "#3498db",
        }}
      >
        <Typography sx={{ fontWeight: "bold", padding: "20px" }}>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;{" "}
          {modules.length} MODULES &nbsp; &nbsp; &nbsp; &nbsp; 2 Hours{" "}
          -TOTAL TIME
        </Typography>
        {modules.map((module: Module) => (
          <Card
            key={module.id}
            sx={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              marginBottom: "20px",
              color: "#3498db",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Module {module.id}:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: "auto",
                    textAlign: "justify",
                    fontWeight:"bold"
                  }}
                >
                  Duration: {module.duration}
                </Typography>
              </Grid>
            </Grid>
            <div>
              {module.id === 1 && (
                <Typography variant="body1" sx={{ color: "#3498db" }}>
                  Welcome to Module 1! In this foundational module, you'll
                  learn the core principles and essential concepts of{" "}
                  {name_v}. Get ready to kickstart your journey in
                  mastering {name_v}.
                </Typography>
              )}
              {module.id === 2 && (
                <Typography variant="body1" sx={{ color: "#3498db" }}>
                  Advanced {name_v} Techniques. Delve deeper into {name_v}{" "}
                  with advanced techniques and practical examples. Enhance
                  your expertise and discover the intricacies of {name_v}{" "}
                  in Module 2.
                </Typography>
              )}
              {module.id === 3 && (
                <Typography variant="body1" sx={{ color: "#3498db" }}>
                  {name_v} Applications in Real Life. Apply your knowledge
                  in real-world scenarios with Module 3. Gain hands-on
                  experience and learn how to effectively utilize {name_v}{" "}
                  in various practical applications.
                </Typography>
              )}
              {module.id === 4 && (
                <Typography variant="body1" sx={{ color: "#3498db" }}>
                  Mastering {name_v} Projects. Take on advanced projects
                  and challenges in Module 4. Strengthen your skills and
                  showcase your proficiency in {name_v} through engaging
                  and rewarding projects.
                </Typography>
              )}
              {module.id === 5 && (
                <Typography variant="body1" sx={{ color: "#3498db" }}>
                  Emerging Trends in {name_v}. Stay updated with the
                  latest trends and advancements in {name_v}. Explore
                  cutting-edge concepts and ensure you're at the forefront
                  of {name_v} knowledge.
                </Typography>
              )}
            </div>
          </Card>
        ))}
      </Card>
      <Card
        sx={{
          background: "rgba(175, 219, 245, 1)",
          padding: "20px",
          borderRadius: "10px",
          alignItems: "center",
          width: "fit-content",
          marginLeft: "350px",
          marginBottom: "30px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "5px",
            background: "#3498db",
            color: "white",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          COMMENT
        </Button>
      </Card>
    </Container>
  );
};
export default CourseLandingPage;
