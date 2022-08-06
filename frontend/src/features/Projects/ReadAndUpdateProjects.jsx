import { useState } from "react";
import projectService from "../../services/projects";
import ProjectForm from "../../components/forms/ProjectForm";
import Project from "./Project";
import handleDeleteProject from "./DeleteProject";

const ReadAndUpdateProjects = ({
  user,
  tasks,
  onTasks,
  allTasks,
  onAllTasks,
  projects,
  onProjects,
  projectTitle,
  onProjectTitle,
  onAddProject,
  onSystemMessage,
  navigate,
}) => {
  //function to show task form for editing task inline, populates fields with current data
  //hides the current task being edited
  const showUpdateProjectForm = (id) => {
    onAddProject(false);
    onProjectTitle(projects.filter((project) => project.id === id)[0].title);

    onProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? { ...project, isEditing: !project.isEditing }
          : { ...project, isEditing: false }
      )
    );
  };

  //function to hide task form for editing project
  //reons form fields on cancel
  const hideUpdateProjectForm = () => {
    onProjectTitle("");
    onProjects((prevProjects) =>
      prevProjects.map((project) => ({ ...project, isEditing: false }))
    );
  };

  //function to update project from submission of form event
  //puts to db with helper function and updates task in UI
  const handleUpdateProject = async (e, id) => {
    try {
      e.preventDefault();

      const updatedProject = projects.filter((project) => project.id === id)[0];
      //move these into taskservice function

      updatedProject.title = projectTitle;
      updatedProject.isEditing = false;
      await projectService.updateProjects(
        {
          ...updatedProject,
        },
        user
      );

      onProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === id
            ? {
                ...project,
                title: updatedProject.title,
                isEditing: updatedProject.isEditing,
              }
            : project
        )
      );
      onProjectTitle("");
    } catch (error) {
      onSystemMessage("System encountered an error");
      setTimeout(() => {
        onSystemMessage(null);
      }, 3000);
    }
  };
  const projectElements = projects.map((project) =>
    !project.isArchived ? (
      !project.isEditing ? (
        <Project
          onUpdate={showUpdateProjectForm}
          onDelete={() =>
            handleDeleteProject(
              {
                user,
                tasks,
                onTasks,
                onAllTasks,
                projects,
                onProjects,
                onSystemMessage,
              },
              project.id,
              navigate
            )
          }
          title={project.title}
          key={project.id}
          id={project.id}
          tasks={allTasks}
        />
      ) : (
        <ProjectForm
          onSubmit={(e) => handleUpdateProject(e, project.id)}
          onChange={(e) => onProjectTitle(e.target.value)}
          onClick={hideUpdateProjectForm}
          value={projectTitle}
          id={project.id}
          key={project.id}
          submitText="save"
        />
      )
    ) : null
  );

  return <ul className="menu text-base pl-3 ">{projectElements}</ul>;
};

export default ReadAndUpdateProjects;
