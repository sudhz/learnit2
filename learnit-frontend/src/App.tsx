import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Tooltip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { Link, Outlet, useLocation } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { AuthContext } from "./services/context/auth/authContext";

const App: React.FC = () => {
  const location = useLocation();
  const renderProfileLink = location.pathname.startsWith("/instructor/home");
  const renderStudentLink = location.pathname.startsWith("/student/home");
  const { auth } = useContext(AuthContext);
  return (
    <>
      <header>
        <AppBar color="primary" position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Link
                to={
                  auth.isLoggedIn
                    ? auth.user === "student"
                      ? "student/home"
                      : "instructor/home"
                    : "/"
                }
              >
                <div style={{ color: "white" }}>
                  <SchoolIcon color="inherit" />
                </div>
              </Link>
            </IconButton>
            <Typography
              variant="h5"
              component={Link}
              sx={{ color: "white", textDecoration: "none" }}
              to={
                auth.isLoggedIn
                  ? auth.user === "student"
                    ? "student/home"
                    : "instructor/home"
                  : "/"
              }
            >
              Learnit
            </Typography>

            {renderStudentLink && (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: "flex", alignItems: "center" }}></Box>
                <Tooltip title="Library">
                  <IconButton
                    size="large"
                    color="inherit"
                    component={Link}
                    to="/courses"
                  >
                    <LibraryBooksIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Profile">
                  <IconButton
                    size="large"
                    color="inherit"
                    component={Link}
                    to={`/student/home/profile/${auth.id}`}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {renderProfileLink && (
              <>
                <Tooltip title="Library">
                  <IconButton
                    size="large"
                    color="inherit"
                    component={Link}
                    to="/courses"
                    sx={{ marginLeft: "auto" }}
                  >
                    <LibraryBooksIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Course">
                  <IconButton
                    size="large"
                    color="inherit"
                    component={Link}
                    to="/instructor/home/coursebuilder"
                  >
                    <AddIcon /> {/* Assuming you have an AddIcon imported */}
                  </IconButton>
                </Tooltip>

                <Tooltip title="My Courses">
                  <IconButton
                    size="large"
                    color="inherit"
                    component={Link}
                    to="/instructor/home/courses"
                  >
                    <BookmarkIcon /> {/* Using MyCourses icon */}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Profile">
                  <IconButton
                    size="large"
                    color="inherit"
                    component={Link}
                    to={`/instructor/home/profile/${auth.id}`}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Toolbar>
        </AppBar>
      </header>
      <main>
        <Box height="100%" pt={7} sx={{ display: "flex" }}>
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
        <AppBar
          color="primary"
          position="static"
          sx={{ top: "auto", bottom: 0, padding: 3 }}
        >
          <Toolbar>
            <Container>
              <Typography
                variant="body2"
                color="inherit"
                align="center"
                gutterBottom
              >
                Contact Details: contact@learnit.com | Phone: 123-456-7890
              </Typography>
              <Typography variant="body2" color="inherit" align="center">
                Address: Dayforce, Azure Building, Bangalore
              </Typography>
            </Container>
          </Toolbar>
        </AppBar>
      </footer>
    </>
  );
};

export default App;
