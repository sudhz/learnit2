import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Instructor from "../model/instructor";
import { AddInstructor } from "../services/api/instructorService";
import Student from "../model/student";
import { AddStudent } from "../services/api/studentService";
import { isAxiosError } from "axios";

const schema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().refine(
      (value) => {
        if (!value) return true;
        return /^\d{10}$/.test(value);
      },
      { message: "Phone number must be 10 digits" }
    ),
    role: z.string().min(1, { message: "Please select a role" }),
    password: z.string().min(8, { message: "Password must be 8 characters" }),
    confirmedPassword: z
      .string()
      .min(8, { message: "Password must be 8 characters" }),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    path: ["confirmedPassword"],
    message: "Passwords do not match",
  })
  .refine(
    (data) =>
      data.role !== "instructor" || (data.role === "instructor" && data.bio),
    {
      path: ["bio"],
      message: "You need to enter a bio as an instructor",
    }
  );

type FormFields = z.infer<typeof schema>;

const InstructorSignup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (role === "instructor") {
        const obj: Instructor = {
          instructorName: data.name,
          email: data.email,
          phone: data.phone ? data.phone : null,
          password: data.password,
          bio: data.bio,
        };
        const response = await AddInstructor(obj);
        console.log(response);
      } else {
        const obj: Student = {
          studentName: data.name,
          email: data.email,
          phone: data.phone ? data.phone : undefined,
          password: data.password,
        };
        const response = await AddStudent(obj);
        console.log(response);
      }
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1125);
    } catch (error) {
      if (isAxiosError(error)) {
        setError("root", {
          message: error?.message,
        });
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const role = watch("role");
  return (
    <Stack margin={5} alignItems="center">
      <Typography variant="h2">Signup</Typography>
      <Box margin={3}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} width={400}>
            <TextField
              {...register("name")}
              label="Name"
              type="text"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              {...register("email")}
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("phone", { required: false })}
              label="Phone"
              type="number"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              {...register("password")}
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              {...register("confirmedPassword")}
              label="Confirm Password"
              type="password"
              error={!!errors.confirmedPassword}
              helperText={errors.confirmedPassword?.message}
            />
            {role === "instructor" && (
              <TextField
                {...register("bio", { required: false })}
                label="Bio"
                type="text"
                error={!!errors.bio}
                helperText={errors.bio?.message}
              />
            )}
            <Controller
              name="role"
              control={control}
              defaultValue="student"
              render={({ field }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Signup as</FormLabel>
                  <RadioGroup row aria-label="role" {...field}>
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Student"
                      onClick={() => {
                        reset({ bio: undefined });
                      }}
                    />
                    <FormControlLabel
                      value="instructor"
                      control={<Radio />}
                      label="Instructor"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
            {errors.root && (
              <Alert severity="error">{errors.root.message}</Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Signup"}
            </Button>
            <Button
              variant="contained"
              color="inherit"
              disabled={isSubmitting}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            {isSubmitSuccessful && (
              <Alert icon={<Check fontSize="inherit" />} severity="success">
                Signup successfull, now please log in
              </Alert>
            )}
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default InstructorSignup;
