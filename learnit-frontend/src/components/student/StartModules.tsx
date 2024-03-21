import React from "react";
import { Link } from "react-router-dom";

const StartModules: React.FC = () => {
  const moduleData = {
    id: 1,
    title: "Module 1: Getting Started with React",
    description: "This module covers the basics of React programming.",
    duration: "2 weeks",
  };

  return (
    <div>
      <h1>{moduleData.title}</h1>
      <p>{moduleData.description}</p>
      <p>Duration: {moduleData.duration}</p>
      <Link to="/student/startcourse/startmodule/lecture">
        <button>View lecture</button>
      </Link>
    </div>
  );
};

export default StartModules;
