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
import StudentCourses from "./components/student/StudentCourses";
import CourseLandingPage from "./components/CourseLanding";
import OnlinePaymentPage from "./components/OnlinePaymentPage";
import Login from "./components/Login";
import StudentHome from "./components/student/StudentHome";
import InstructorHome from "./components/instructor/InstructorHome";
import ProtectedRoute from "./components/ProtectedRoute";
import CourseDescription from "./components/instructor/CourseDescription";
import CourseDiscussion from "./components/student/CourseDiscussion";
import SignUp from "./components/SignUp";
import InstructorSignup from "./components/instructor/InstructorSignup";
import StudentSignup from "./components/student/StudentSignup";
import InstructorCourses from "./components/instructor/InstructorCourses";
import InstructorProfile from "./components/instructor/InstructorProfile";
import UpdateInstructorProfile from "./components/instructor/UpdateInstructorProfile";
import StudentProfile from "./components/student/StudentProfile";
import UpdateStudentProfile from "./components/student/UpdateStudentProfile";
import TimeTable from "./components/student/TimeTable";
import StartModules from "./components/student/StartModules";
import CourseBuilder from "./components/instructor/CourseBuilder";

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
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/instructor/signup",
        element: <InstructorSignup />,
      },
      {
        path: "/instructor/:id/profile",
        element: <InstructorProfile />,
      },
      {
        path: "/instructor/:id/profile/edit",
        element: <UpdateInstructorProfile />,
      },
      {
        path: "/student/signup",
        element: <StudentSignup />,
      },
      {
        path: "/student/:id/profile",
        element: <StudentProfile />,
      },
      {
        path: "/student/:id/profile/edit",
        element: <UpdateStudentProfile />,
      },
      {
        path: "/student/:id/timetable",
        element: <TimeTable />,
      },
      {
        path: "/student/course/:id",
        element: <StartModules />,
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
        path: "/instructor/courses",
        element: <InstructorCourses />,
      },
      {
        path: "/instructor/coursebuilder",
        element: <CourseBuilder />,
      },
      {
        path: "/student/home",
        element: (
          <ProtectedRoute>
            <StudentHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/instructor/home",
        element: (
          <ProtectedRoute>
            <InstructorHome />
          </ProtectedRoute>
        ),
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
        path: "/course/description/:id",
        element: <CourseDescription />,
      },
      {
        path: "/course/discussion/:id/:studId",
        element: <CourseDiscussion />,
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
