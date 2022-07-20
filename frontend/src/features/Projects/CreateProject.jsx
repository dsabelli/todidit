import { useState } from "react";
import projectService from "../../services/projects";
import ProjectForm from "../../components/forms/ProjectForm";
import Button from "../../components/UI/Button";

const CreateProject = ({
  user,
  onProjects,
  projectTitle,
  onProjectTitle,
  addProject,
  onAddProject,
  onSystemMessage,
}) => {
  //function to show create project form
  const showCreateProjectForm = () => {
    onProjectTitle("");
    onAddProject((prevVal) => !prevVal);
    onProjects((prevProjects) =>
      prevProjects.map((project) => ({ ...project, isEditing: false }))
    );
  };

  //function to hide create project form
  const hideCreateProjectForm = (e) => {
    e.preventDefault();
    onAddProject((prevVal) => !prevVal);
    onProjectTitle("");
  };

  //function to create projects from submission of form event
  //posts to db with helper function and adds new task to UI
  const handleCreateProject = async (e) => {
    try {
      e.preventDefault();
      const newProject = await projectService.createProjects(
        {
          title: projectTitle,
        },
        user
      );
      onProjectTitle("");
      onProjects((prevProjects) => prevProjects.concat(newProject));
      showCreateProjectForm();
    } catch (error) {
      onSystemMessage("System encountered an error");
      setTimeout(() => {
        onSystemMessage(null);
      }, 3000);
    }
  };

  return (
    <>
      {addProject ? (
        <ProjectForm
          onSubmit={(e) => handleCreateProject(e)}
          value={projectTitle}
          onChange={(e) => onProjectTitle(e.target.value)}
          onClick={hideCreateProjectForm}
          submitText="add"
        />
      ) : (
        user && (
          <Button
            onClick={() => showCreateProjectForm()}
            className="btn mt-10 "
            text="Add Project"
          />
        )
      )}
    </>
  );
};

export default CreateProject;
