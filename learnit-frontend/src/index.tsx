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
import CourseDescription from "./components/instructor/CourseDescription";
import CourseDiscussion from "./components/student/CourseDiscussion";

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
        path: "course/description/:id",
        element: <CourseDescription />,
      },
      {
        path: "course/discussion/:id/:studId",
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
