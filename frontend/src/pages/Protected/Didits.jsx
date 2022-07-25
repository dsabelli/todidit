import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { DiditContext } from "../../context/DiditContext";
import Didit from "../../features/Didits/Didit";
import { parseJSON } from "date-fns";

const Didits = () => {
  const { didits, setDidits } = useContext(DiditContext);
  //not sure why I need all context before projects
  const [tasks, setTasks, allTasks, setAllTasks, projects] = useOutletContext();
  let params = useParams();
  const diditEl = didits.map((didit) =>
    didit.id === params.id ? (
      <Didit
        key={didit.id}
        title={didit.title}
        description={didit.description}
        project={projects.find((project) => project.id === didit.project).title}
        completedOn={parseJSON(didit.completedOn)}
        createdOn={parseJSON(didit.createdOn)}
        dueOn={parseJSON(didit.dueDate)}
      />
    ) : null
  );
  return <div>{diditEl}</div>;
};

export default Didits;
