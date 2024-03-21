import {
    Alert,
    Box,
    Button,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import { SubmitHandler, useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useState } from "react";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  import { useNavigate } from "react-router-dom";
  import Instructor from "../model/instructor";
  import Student from "../model/student";
  import { AddInstructor } from "../services/api/instructorService";
  import { AddStudent } from "../services/api/studentService";
  
  const schema = z
    .object({
      role: z.enum(["student", "instructor"]),
      name: z.string(),
      email: z.string().email(),
      phone: z
        .string()
        .optional()
        .refine(
          (value) => {
            if (!value) return true;
            return /^\d{10}$/.test(value);
          },
          { message: "Phone number must be 10 digits" }
        ),
      password: z
        .string()
        .min(8, { message: "Password number must be 8 characters" }),
      confirmedPassword: z
        .string()
        .min(8, { message: "Password number must be 8 characters" }),
      bio: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmedPassword, {
      path: ["confirmedPassword"],
      message: "Passwords do not match",
    });
  
  type FormFields = z.infer<typeof schema>;
  
  const Signup = () => {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
      watch,
    } = useForm<FormFields>({
      resolver: zodResolver(schema),
      defaultValues: {
        role: "student",
      },
    });
  
    const role = watch("role");
  
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
      try {
        if (data.role === "student") {
          const studentObj: Student = {
            studentName: data.name,
            email: data.email,
            phone: data.phone || undefined,
            password: data.password,
          };
          const response = await AddStudent(studentObj);
          console.log(response);
          alert("Student signup successful!");
          navigate("/student/login");
        } else {
          const instructorObj: Instructor = {
            instructorName: data.name,
            email: data.email,
            phone: data.phone || null,
            password: data.password,
            bio: data.bio || "",
          };
          console.log(instructorObj);
          const response = await AddInstructor(instructorObj);
          console.log(response);
          alert("Instructor signup successful!");
          navigate("/instructor/login");
        }
      } catch (error) {
        setError("root", {
          message: `${error}`,
        });
      }
    };
  
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <Stack margin={5} alignItems="center">
        <Typography variant="h2">Signup</Typography>
        <Box margin={3}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} width={400}>
              <RadioGroup {...register("role")}>
                <FormControlLabel
                  value="student"
                  control={<Radio />}
                  label="Student"
                />
                <FormControlLabel
                  value="instructor"
                  control={<Radio />}
                  label="Instructor"
                />
              </RadioGroup>
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
                label="Phone (optional)"
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
              {/* Conditionally render the bio field based on the selected role */}
              {role === "instructor" && (
                <TextField
                  {...register("bio", { required: false })}
                  label="Bio"
                  type="text"
                  error={!!errors.bio}
                  helperText={errors.bio?.message}
                />
              )}
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
                color="primary"
                disabled={isSubmitting}
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    );
  };
  
  export default Signup;