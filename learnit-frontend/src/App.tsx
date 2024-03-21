import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [signupOpen, setSignupOpen] = useState(false);

  const handleSignupChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    navigate(`/${selectedValue}/signup`);
  };

  const handleSignupClick = () => {
    setSignupOpen(!signupOpen);
  };

  return (
    <>
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                component={Link}
                to="/"
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <SchoolIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Learnit
              </Typography>
              {location.pathname === "/" ? (
                <Button color="inherit" onClick={() => navigate("/courses")}>
                  Browse courses
                </Button>
              ) : null}
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <FormControl sx={{minWidth: 120 }}>
                <InputLabel id="signup-label" style={{ color: "white" }}>
                  SIGN UP
                </InputLabel>
                <Select
                  labelId="signup-label"
                  id="signup-select"
                  value=""
                  open={signupOpen}
                  onOpen={handleSignupClick}
                  onClose={handleSignupClick}
                  onChange={handleSignupChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === "") {
                      return <em style={{ color: "white" }}></em>;
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="instructor">Instructor</MenuItem>
                </Select>
              </FormControl>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <main>
        <Box
          sx={{
            marginTop: 10,
            marginLeft: { xs: 1, sm: 2, md: 10, lg: 10 },
            marginRight: { xs: 1, sm: 2, md: 10, lg: 10 },
          }}
        >
          <Outlet />
        </Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
