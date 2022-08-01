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

const DiditSearch = ({ projects }) => {
  const { user } = useContext(UserContext);
  const { didits, setDidits } = useContext(DiditContext);
  const [visible, setVisible] = useState(false);
  const [diditSearch, setDiditSearch] = useState("");
  const [debouncedDidit] = useDebounce(diditSearch, 200);
  const [diditDateStart, setDiditDateStart] = useState("");
  const [diditDateEnd, setDiditDateEnd] = useState("");

  //api call with state and debounced string query state.
  //queries on change of date or debounced string.
  useEffect(() => {
    const getDidits = async () => {
      const searchedDidits = await diditService.getDidits(
        diditSearch,
        diditDateStart,
        diditDateEnd,
        user
      );

      debouncedDidit && setDidits(searchedDidits);
    };
    getDidits();
  }, [debouncedDidit, diditDateStart, diditDateEnd]);

  //function to filter the selected id from the dropdown
  const filterSelected = (id) => {
    setDidits((prevDidits) => prevDidits.filter((didit) => didit.id === id));
  };

  //if there are didits, map with a link using their id.
  //when clicked, hide dropdown, filter didit array to the selected didit, reset the search.
  const diditElements = didits
    ? didits.map((didit) => (
        <Link
          to={`/app/didit/${didit.id}`}
          key={didit.id}
          onClick={() => (
            setVisible(false), filterSelected(didit.id), setDiditSearch("")
          )}
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
    <div className="flex flex-col gap-2 md:flex-row">
      {/* only show date range when searching didits */}
      <div
        className={` ${diditSearch || didits.length > 1 ? "block" : "hidden"}`}
      >
        <DateRange
          diditDateStart={diditDateStart}
          onDiditDateStart={setDiditDateStart}
          diditEndDate={diditDateEnd}
          onDiditDateEnd={setDiditDateEnd}
        />
      </div>
      <div className="form-control w-40 sm:w-64 ">
        <Input
          value={diditSearch || ""}
          type="text"
          placeholder="Search Didits..."
          className="input w-full focus:outline-none text-accent-content bg-accent-focus placeholder-opacity-50 placeholder-accent-content"
          // if not an empty string, get didits with title of value,
          // otherwise clear everything and focus input for next search
          onChange={(e) =>
            e.target.value !== ""
              ? (setDiditSearch(e.target.value), setVisible(true))
              : (setVisible(false),
                setDidits([]),
                setDiditSearch(""),
                setDiditDateStart(""),
                setDiditDateEnd(""),
                e.target.focus())
          }
          //on escape or enter keypress, clear everything
          onKeyDown={(e) =>
            e.key === "Escape" || e.key === "Enter"
              ? ((e.target.value = ""),
                setVisible(false),
                e.target.blur(),
                setDiditSearch(""),
                setDiditDateStart(""),
                setDiditDateEnd(""),
                setDidits([]))
              : null
          }
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
