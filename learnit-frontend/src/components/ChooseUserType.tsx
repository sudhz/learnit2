import { Button, Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const ChooseUserType = () => {
  return (
    <Stack margin={25} alignItems="center">
      <Typography variant="h2">Continue as</Typography>
      <Box margin={10}>
        <Stack spacing={4} direction="row">
          <Button
            component={Link}
            to="/student"
            variant="contained"
            size="large"
          >
            a student
          </Button>
          <Button
            component={Link}
            to="/instructor"
            variant="contained"
            size="large"
          >
            an instructor
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ChooseUserType;
