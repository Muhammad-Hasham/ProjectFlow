// ProjectDetailsPage.js
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //const project = findProjectById(id); // You need to implement a function to find the project by its ID

  if (!project) {
    return (
      <div>
        <p>Project not found.</p>
      </div>
    );
  }

  const handleDeleteProject = () => {
    // Implement project deletion logic here
    navigate("/myprojects");
  };

  return (
    <div>
      <h2>Project Details</h2>
      <p>Project Name: {project.name}</p>
      <p>Project Manager: {project.manager}</p>
      <p>Creation Date: {project.creationDate}</p>
      <p>Due Date: {project.dueDate}</p>
      <p>Project Description: {project.description}</p>
      <button onClick={handleDeleteProject}>Delete Project</button>
    </div>
  );
};

export default ProjectDetailsPage;
