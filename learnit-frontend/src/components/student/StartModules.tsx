import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Module from "../../model/module";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import useLocalStorage from "../../services/hooks/useLocalStorage";

const StartModules: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [modules, setModules] = useState<Module[]>([]);
  const navigate = useNavigate();
  const { getItem } = useLocalStorage("user");

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const commentResponse = await axios.get(
          `http://localhost:5110/api/course/${id}`
        );
        setModules(commentResponse.data.modules);
        console.log(commentResponse.data.modules);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchModules();
  }, [id]);

  return (
    <>
      <Typography variant="h6">Modules</Typography>
      <Box minHeight="55vh">
        <List>
          {modules.map((module, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={module.moduleName}
                secondary={`Duration: ${module.moduleDuration}`}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate(`/student/module/${module.moduleId}/quiz`)
                  }
                >
                  Start Quiz
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate(`/student/module/${module.moduleId}/lectures`)
                  }
                >
                  View Lectures
                </Button>
              </Stack>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(`/course/discussion/${id}/${getItem().id}`);
          }}
        >
          COMMENT
        </Button>
        <br></br>
        <br></br>
        <Button
          variant="contained"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(`/student/course/assignment/${id}`);
          }}
        >
          View Assignment
        </Button>
      </Box>
    </>
  );
};

export default StartModules;
