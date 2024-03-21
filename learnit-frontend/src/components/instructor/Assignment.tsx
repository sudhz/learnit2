import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Grid, InputLabel } from '@mui/material';
import { addAssignment } from '../../services/api/assignmentService';

const AddAssignmentForm: React.FC = () => {
  const [assignmentDetails, setAssignmentDetails] = useState('');
  const [deadline, setDeadline] = useState('');
  // const [deadline, setDeadline] = useState<Date>(new Date());

  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleOpenDialog(); // Open the dialog when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   // Check if details are empty
  //   if (assignmentDetails.trim() === '') {
  //     return; // Don't submit if details are empty
  //   }
  //   // Call the addAssignment function to pass the assignment data to the service
  //   try {
  //     await addAssignment({
  //       a_details: assignmentDetails,
  //       course_id: 4,
  //       a_deadline: deadline
  //     });
  //     console.log('Assignment added successfully');
  //     alert('Assignment added successfully')
  //   } 
  //   catch (error) {
  //     console.error('Error adding assignment:', error);
  //   }
  //   // Close the dialog
  //   handleCloseDialog();
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Check if details are empty
    if (assignmentDetails.trim() === '') {
      return; // Don't submit if details are empty
    }
  
    // Prepare data to be sent in the request
    const requestData = {
      ADetails: assignmentDetails,
      CourseId: 4,
      ADeadline: deadline
    };
  
    // Log the request body
    console.log('Request Body:', requestData);
  
    // Call the addAssignment function to pass the assignment data to the service
    try {
      await addAssignment(requestData);
      console.log('Assignment added successfully');
      alert('Assignment added successfully')
    } 
    catch (error) {
      console.error('Error adding assignment:', error);
    }
    
    // Close the dialog
    handleCloseDialog();
  };

  const handleDeadlineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.value);
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Assignment</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel htmlFor="details">Assignment Details *</InputLabel>
                <TextField
                  fullWidth
                  id="details"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={assignmentDetails}
                  onChange={(e) => setAssignmentDetails(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="deadline">Deadline</InputLabel>
                <TextField
                  fullWidth
                  id="deadline"
                  variant="outlined"
                  type="string" // Changed type to 'datetime-local'
                  value={deadline}
                  onChange={handleDeadlineChange} // Added onChange event handler
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Assignment
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddAssignmentForm;
