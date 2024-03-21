import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the schema for validation
const schema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  availability: z.enum(["always", "timeBased"]),
  availableFrom: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date format should be YYYY-MM-DD",
    }),
  availableTo: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date format should be YYYY-MM-DD",
    }),
  courseStartDate: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date format should be YYYY-MM-DD",
    }),
  courseEndDate: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date format should be YYYY-MM-DD",
    }),
  imgUrl: z.string().url({ message: "Please enter a valid URL" }),
  price: z.string().nonempty({ message: "Price must be a positive number" }),
  content: z.string().nonempty({ message: "Content is required" }),
});

type FormFields = z.infer<typeof schema>;

const CourseBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [courseId, setCourseId] = useState<number | null>(null);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedRadio(event.currentTarget.value);
  // };

  const onSubmitCreateCourse: SubmitHandler<FormFields> = async (data) => {
    try {
      const newCourse = JSON.stringify({
        courseName: data.title,
        courseDescription: data.content,
        imgUrl: data.imgUrl,
        price: data.price,
        createdAt: "2024-03-18T14:33:51.657",
        instructorId: 2,
        instructor: null,
        categories: [],
        modules: [],
        students: [],
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:5110/api/course",
        headers: {
          "Content-Type": "application/json",
        },
        data: newCourse,
      };
      const response = await axios.request(config);
      setCourseId(response.data.id);
      alert("Error creating course. Please try again.");
    } catch (error) {
      console.log(error);
      alert("Course created successfully!");
    }
  };

  // const handleConfirm = () => {
  //   switch (selectedRadio) {
  //     case "option1":
  //       {
  //         navigate(`/instructor/home/coursebuilder/${courseId}/video`);
  //       }
  //       break;
  //     case "option2":
  //       {
  //         navigate("/instructor/home/coursebuilder/Assignment");
  //       }
  //       break;
  //     case "option3":
  //       {
  //         navigate("/instructor/home/coursebuilder/quiz");
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  //   handleClose();
  // };
  // const navigator = (path: string) => {
  //   window.location.href = path;
  // };
  useEffect(() => {
    handleOpenDialogue();
  }, []);
  const handleOpenDialogue = () => {
    setOpen(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control, // Use control for Controller
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <Box
      margin={2}
      padding={5}
      borderRadius={2}
      boxShadow={1}
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box marginTop={2}>
        <Typography
          variant="h5"
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          {" "}
          Title{" "}
        </Typography>
        <br></br>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} width={500}>
            <TextField
              {...register("title")}
              label="Course Title"
              type="text"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <FormControl component="fieldset">
              <Typography
                component="legend"
                variant="h5"
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                Availability
              </Typography>
              <RadioGroup {...register("availability")} defaultValue="always">
                <FormControlLabel
                  value="always"
                  control={<Radio />}
                  label="Always Available"
                />
                <FormControlLabel
                  value="timeBased"
                  control={<Radio />}
                  label="Time-Based Availability"
                />
                <TextField
                  {...register("imgUrl")}
                  label="Image URL"
                  type="text"
                  error={!!errors.imgUrl}
                  helperText={errors.imgUrl?.message}
                />
                <TextField
                  {...register("price")}
                  label="Price"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </RadioGroup>
            </FormControl>
            {/* Add the course start and end date fields */}
            <Typography
              component="legend"
              variant="h5"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              Course Date
            </Typography>
            <Controller
              name="courseStartDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.courseStartDate}
                  helperText={errors.courseStartDate?.message}
                />
              )}
            />
            <Controller
              name="courseEndDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.courseEndDate}
                  helperText={errors.courseEndDate?.message}
                />
              )}
            />
            <Typography
              component="legend"
              variant="h5"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              Content
            </Typography>

            <TextField
              {...register("content")}
              label="Course Content"
              type="text"
              multiline
              rows={1}
              error={!!errors.content}
              helperText={errors.content?.message}
            />

            {/* <Button variant="outlined" onClick={handleClickOpen}>
              Add Item
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            > */}
            {/* <DialogTitle id="alert-dialog-title">New Item</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Upload Or Create
                </DialogContentText>

                <RadioGroup
                  aria-label="items"
                  name="items1"
                  value={selectedRadio}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="option1"
                    control={<Radio />}
                    label="Video"
                  />
                  <FormControlLabel
                    value="option2"
                    control={<Radio />}
                    label="Assignment"
                  />
                  <FormControlLabel
                    value="option3"
                    control={<Radio />}
                    label="Quiz"
                  />
                </RadioGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog> */}

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/instructor/coursebuilder/module");
              }}
            >
              Add Module
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmitCreateCourse)}
            >
              Create Course
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CourseBuilder;
