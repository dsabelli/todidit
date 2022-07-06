import { useState } from "react";

const Menu = (props) => {
  const [selectedProject, setSelectedProject] = useState("");
  const projects = props.projects.map((project) => (
    <li key={project.id} onClick={() => setSelectedProject(project.title)}>
      <a onClick={() => props.onProjectId(project.id)}>{project.title}</a>
    </li>
  ));
  return (
    <ul className="menu bg-base-100 w-56">
      <button className="btn">All</button>
      <button className="btn">Today</button>
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Projects</div>
        <button className="btn">+</button>
        <div className="collapse-content">
          <ul>{projects}</ul>
        </div>
      </div>
    </ul>
  );
};

export default Menu;
