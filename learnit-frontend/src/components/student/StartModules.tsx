import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Module from "../../model/module";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";

const StartModules: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [modules, setModules] = useState<Module[]>([]);
  const navigate = useNavigate();

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
      <Typography variant="h6">Your Modules</Typography>
      <List>
        {modules.map((module, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={module.moduleName}
              secondary={`Duration: ${module.moduleDuration}`}
            />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  navigate(`/student/module/${module.moduleId}/lectures`)
                }
              >
                View Lectures
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default StartModules;
