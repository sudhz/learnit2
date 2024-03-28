import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthInstructor } from "../services/api/instructorService";
import { AuthStudent } from "../services/api/studentService";
import { useState } from "react";
import useLocalStorage from "../services/hooks/useLocalStorage";
import useCookies from "../services/hooks/useCookies";
import { isAxiosError } from "axios";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
  role: z.string().min(1, { message: "Please select a role" }),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage("user");
  const { setCookie } = useCookies();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const auth =
        data.role === "instructor"
          ? await AuthInstructor(data.email, data.password)
          : await AuthStudent(data.email, data.password);
      setItem({ id: auth.id, role: data.role });
      setCookie("token", auth.token);
      setTimeout(() => {
        navigate(
          data.role === "instructor" ? "/instructor/home" : "/student/home",
          {
            replace: true,
          }
        );
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

  return (
    <Stack margin={15} alignItems="center">
      <Typography variant="h2">Login</Typography>
      <Box margin={5}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} width={400}>
            <TextField
              {...register("email")}
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
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
            <Controller
              name="role"
              control={control}
              defaultValue="student"
              render={({ field }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select Role</FormLabel>
                  <RadioGroup row aria-label="role" {...field}>
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
              {isSubmitting ? "Loading..." : "Login"}
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
                Successfully logged in
              </Alert>
            )}
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default Login;
