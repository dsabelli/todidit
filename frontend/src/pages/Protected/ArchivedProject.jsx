import { useEffect, useState, useContext } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import diditService from "../../services/didits";
import { parseJSON } from "date-fns";
import Didit from "../../features/Didits/Didit";
import { UserContext } from "../../context/UserContext";
const ArchivedProject = () => {
  let params = useParams();
  const { user } = useContext(UserContext);
  const [didits, setDidits] = useState([]);
  const [tasks, setTasks, allTasks, setAllTasks, projects] = useOutletContext();

  //When the archived project link in the menu bar is clicked, take the id from params
  //and use it in api request. Set didits array from response
  useEffect(() => {
    const getArchivedProject = async () => {
      const archivedProject = await diditService.getArchivedProject(
        params.id,
        user
      );
      setDidits(archivedProject);
    };
    getArchivedProject();
  }, [params.id]);

  const diditElements =
    didits.length > 0 &&
    didits.map((didit) => (
      <Didit
        key={didit.id}
        title={didit.title}
        description={didit.description}
        project={projects.find((project) => project.id === didit.project).title}
        completedOn={parseJSON(didit.completedOn)}
        createdOn={parseJSON(didit.createdOn)}
        dueOn={parseJSON(didit.dueDate)}
      />
    ));
  return <div>{diditElements}</div>;
};

export default ArchivedProject;
