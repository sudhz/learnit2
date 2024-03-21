import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Instructor = () => {
  return (
    <Stack margin={25} alignItems="center">
      <Typography variant="h2">Start teaching as an instructor!</Typography>
      <Box margin={10}>
        <Stack spacing={4} direction="column">
          <Button
            component={Link}
            to="/instructor/signup"
            variant="contained"
            size="large"
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/instructor/login"
            variant="contained"
            size="large"
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Instructor;
