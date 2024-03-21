import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
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
