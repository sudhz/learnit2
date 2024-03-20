import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Lecture from '../../model/lecture';

const LectureEdit: React.FC = () => {
  const [lecture, setLecture] = useState<Lecture>({
    lectureId: 0,
    lectureName : " ",
    lectureUrl: " ",
    lectureDuration:" " ,
    moduleId:0
  });
  const { id } = useParams<{ id: string }>(); // Ensure id is of string type

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await axios.get<Lecture>(`http://localhost:5110/api/lecture/${id}`);
        const { lectureId,lectureName ,lectureUrl,lectureDuration , moduleId } = response.data;
        setLecture(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching Lecture:', error);
      }
    };

    fetchLecture();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLecture({ ...lecture, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Send updated lecture data to the backend to save changes
      await axios.put(`http://localhost:5110/api/lecture/${id}`,lecture); // Modify the URL as per your backend endpoint
      console.log('Lecture updated successfully:', lecture);
      alert('Lecture updated successfully')
      // Optionally, you can navigate to another page or show a success message here
    } catch (error) {
      console.error('Error updating Lecture:', error);
      alert('Lecture updation unsuccessful')
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        width={400}
        padding={2}
      >
        <h1> Edit Lecture</h1>
        <TextField
          fullWidth
          label="Name"
          name="lectureName"
          value={lecture.lectureName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="normal"
          name="lectureLink"
          value={lecture.lectureUrl}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          type="text"
          label="Duration"
          name="Duration"
          value={lecture.lectureDuration}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained"  color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default LectureEdit;
