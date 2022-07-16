import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { DiditContext } from "../../components/context/DiditContext";
import Didit from "../../components/Didits/Didit";
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
        //temp fix for didits with no project
        project={
          didit.project
            ? projects.find((project) => project.id === didit.project).title
            : null
        }
        completedOn={parseJSON(didit.completedOn)}
      />
    ) : null
  );
  return <div>{diditEl}</div>;
};

export default Didits;
