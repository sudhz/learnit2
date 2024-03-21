import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CourseCatalog from "./components/CourseCatalog";
import HomePage from "./components/HomePage";
import StudentCourses from "./components/Student/StudentCourses";
import CourseLandingPage from "./components/CourseLanding";
import OnlinePaymentPage from "./components/OnlinePaymentPage";
import Login from "./components/Login";
import TimeTable from "./components/Student/TimeTable";
import StudentSignup from "./components/Student/StudentSignup";
import UpdateStudentProfile from "./components/Student/UpdateStudentProfile";
import UpdateInstructorProfile from "./components/Instructor/UpdateInstructorProfile";
import InstructorSignup from "./components/Instructor/InstructorSignup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/courses",
        element: <CourseCatalog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/student/courses",
        element: <StudentCourses />,
      },
      {
        path: "/course/:id",
        element: <CourseLandingPage />,
      },
      {
        path: "/payment",
        element: <OnlinePaymentPage />,
      },
      {
        path: "timetable/:id",
        element: <TimeTable />,
      },
      {
        path: "student/signup",
        element: <StudentSignup />,
      },
      {
        path: "instructor/signup",
        element: <InstructorSignup />,
      },
      {
        path: "updatestudent/:id",
        element: <UpdateStudentProfile />,
      },
      {
        path: "updateinstructor/:id",
        element: <UpdateInstructorProfile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
