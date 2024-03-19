import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Grid, Button, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CourseDescription: React.FC = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  type UpdatedDescription = {
    UDescription: string;
  };
  useEffect(() => {
    const fetchData = async () => {
       setIsLoading(true);
       try {
         const courseResponse = await axios.get(`http://localhost:5110/api/course/${id}`);
         //console.log(courseResponse.data)
         setDescription(courseResponse.data.courseDescription);
         setCourseName(courseResponse.data.courseName);
         setImgUrl(courseResponse.data.imgUrl);
       } catch (error) {
         console.error("Error fetching data:", error);
       } finally {
         setIsLoading(false);
       }
    };
    fetchData();
   }, [id]);
   

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payload: UpdatedDescription = {
        UDescription: description,
      };

      const response = await axios.put(
        `http://localhost:5110/api/course/${id}/description`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response) {
        throw new Error("Failed to update course description");
      }
      console.log("Course description updated successfully");
    } catch (error) {
      console.error("Error updating course description:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" height="100vh" width="100%" gap={2} ml={0}>
      <Box width="20%" padding={2} height="100%" sx={{ bgcolor: "#1976d2" }}>
        <Stack spacing={2}>
          <Box
            pt={2}
            component="img"
            src={imgUrl}
            alt="Description of the image"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />

          {/* Render course name or empty string if not fetched yet */}
          <Typography variant="h5" sx={{ color: "white" }}>
            {courseName}
          </Typography>
        </Stack>

        <Stack spacing={2} mt={5}>
          <Typography
            variant="h5"
            component={Link}
            sx={{ color: "white", textDecoration: "none" }}
            to=""
          >
            Back to Courses
          </Typography>
          <Typography
            variant="h5"
            component={Link}
            sx={{ color: "white", textDecoration: "none" }}
            to=""
          >
            Course Builder
          </Typography>
        </Stack>
      </Box>

      <Box width="60%" alignSelf="center" height="100%" paddingTop={10}>
        <Typography variant="h4" gutterBottom fontSize={"3rem"}>
          Course Description
        </Typography>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={15}
          value={description}
          onChange={handleDescriptionChange}
        />
        <Grid container justifyContent="flex-end" pt={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSave}
            disabled={isLoading}
          >
            Save
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default CourseDescription;
