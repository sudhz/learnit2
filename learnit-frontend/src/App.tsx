import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import useLocalStorage from "./services/hooks/useLocalStorage";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getItem } = useLocalStorage("user");
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
              {getItem() ? <Button color="inherit">Sign up</Button> : null}
              {getItem() ? (
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
              ) : null}
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <main>
        <Box height="100%" pt={3} sx={{ display: "flex" }}>
          {location.pathname.startsWith("/student/home") && (
            <Box
              width="20%"
              padding={2}
              height={710}
              sx={{ bgcolor: "#1976d2" }}
            >
              <Stack spacing={2} mt={5}>
                <Typography
                  variant="h5"
                  component={Link}
                  sx={{ color: "white", textDecoration: "none" }}
                  to="/student/home/courses"
                >
                  My Courses
                </Typography>
                <Typography
                  variant="h5"
                  component={Link}
                  sx={{ color: "white", textDecoration: "none" }}
                  to="/student/video"
                >
                  Play Course
                </Typography>
              </Stack>
            </Box>
          )}
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
