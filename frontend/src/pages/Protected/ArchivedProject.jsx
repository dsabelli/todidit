import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import diditService from "../../services/didits";
import { parseJSON } from "date-fns";
import Didit from "../../components/Didits/Didit";
const ArchivedProject = () => {
  let params = useParams();
  const [didits, setDidits] = useState([]);
  const [tasks, setTasks, allTasks, setAllTasks, projects] = useOutletContext();
  console.log(projects);
  useEffect(() => {
    const getArchivedProject = async () => {
      const archivedProject = await diditService.getArchivedProject(params.id);
      setDidits(archivedProject);
    };
    getArchivedProject();
  }, [params.id]);

  const diditElements = didits.map((didit) => (
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
  ));
  return <div>{diditElements}</div>;
};

export default ArchivedProject;
