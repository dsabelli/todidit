import { useState, useEffect } from "react";
import Didit from "./Didit";
import DateRange from "./DateRange";
import Input from "../../components/UI/Input";
import diditService from "../../services/didits";
import { parseJSON } from "date-fns";
import { useContext } from "react";
import { DiditContext } from "../../context/DiditContext";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import Dropdown from "../../components/UI/Dropdown";
import Button from "../../components/UI/Button";

const DiditSearch = ({ projects }) => {
  const { user } = useContext(UserContext);
  const { didits, setDidits } = useContext(DiditContext);
  const [visible, setVisible] = useState(false);
  const [diditSearch, setDiditSearch] = useState("");
  const [debouncedDidit] = useDebounce(diditSearch, 200);
  const [diditDateStart, setDiditDateStart] = useState("");
  const [diditDateEnd, setDiditDateEnd] = useState("");

  useEffect(() => {
    const getDidits = async () => {
      const searchedDidits = await diditService.getDidits(
        diditSearch,
        diditDateStart,
        diditDateEnd,
        user
      );

      setDidits(searchedDidits);
    };
    getDidits();
  }, [debouncedDidit, diditDateStart, diditDateEnd]);

  const diditElements = didits
    ? didits.map((didit) => (
        <Link
          to={`/app/didit/${didit.id}`}
          key={didit.id}
          onClick={() => setVisible(false)}
          className="p-1"
        >
          <Didit
            key={didit.id}
            title={didit.title}
            project={
              projects.find((project) => project.id === didit.project).title
            }
            completedOn={parseJSON(didit.completedOn)}
          />
        </Link>
      ))
    : null;

  return (
    <div className="flex gap-2 ">
      <div className={` ${visible ? "flex gap-2" : "hidden"}`}>
        <DateRange
          diditDateStart={diditDateStart}
          onDiditDateStart={setDiditDateStart}
          diditEndDate={diditDateEnd}
          onDiditDateEnd={setDiditDateEnd}
        />
      </div>
      <div className="form-control w-40 sm:w-64 ">
        <Input
          type="text"
          placeholder="Search Didits..."
          className="input w-full focus:outline-none text-accent-content bg-accent-focus placeholder-opacity-50 placeholder-accent-content"
          //if not an empty string, get didits with title of value, otherwise
          //clear  blur to setDidits back to blank and focus for next search
          onChange={(e) =>
            e.target.value !== ""
              ? (setDiditSearch(e.target.value), setVisible(true))
              : (setVisible(false),
                (e.target.value = ""),
                e.target.focus(),
                setDiditDateStart(""),
                setDiditDateEnd(""))
          }
          onKeyDown={(e) =>
            e.key === "Escape" || e.key === "Enter"
              ? ((e.target.value = ""),
                setVisible(false),
                e.target.blur(),
                setDiditDateStart(""),
                setDiditDateEnd(""))
              : null
          }
          // onBlur={(e) => (e.target.value = "")}
        />

        <div
          className={` ${
            visible ? "dropdown dropdown-end dropdown-open" : "hidden"
          }`}
        >
          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-full overflow-y-auto max-h-96"
          >
            <li className={`dropdown ${visible ? "" : "hidden"}`}>
              {diditElements}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiditSearch;
