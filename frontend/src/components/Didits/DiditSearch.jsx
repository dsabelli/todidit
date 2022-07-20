import React, { useState } from "react";
import Didit from "./Didit";
import DateRange from "./DateRange";
import Input from "../UI/Input";
import diditService from "../../services/didits";
import { debounce } from "lodash";
import { parseJSON } from "date-fns";
import { useContext } from "react";
import { DiditContext } from "../../components/context/DiditContext";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const DiditSearch = ({ projects }) => {
  const { user } = useContext(UserContext);
  const { didits, setDidits } = useContext(DiditContext);
  const [visible, setVisible] = useState(false);
  const [diditDateStart, setDiditDateStart] = useState("");
  const [diditDateEnd, setDiditDateEnd] = useState("");

  const getDidits = debounce(async (title) => {
    const searchedDidits = await diditService.getDidits(
      title,
      diditDateStart,
      diditDateEnd,
      user
    );
    setDidits(searchedDidits);
  }, 200);

  const diditElements = didits
    ? didits.map((didit) => (
        <Link
          to={`/app/didit/${didit.id}`}
          key={didit.id}
          title={didit.title}
          onClick={() => setVisible(false)}
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
    <div className="flex-none gap-2">
      <>
        <DateRange
          onDiditDateStart={setDiditDateStart}
          onDiditDateEnd={setDiditDateEnd}
        />
      </>

      <div className="form-control ">
        <Input
          type="text"
          placeholder="Search Didits..."
          className="input input-bordered"
          //if not an empty string, get didits with title of value, otherwise
          //clear (fix debonuce issue) blur to setDidits back to blank and focus for next searcg
          onChange={(e) =>
            e.target.value !== ""
              ? (getDidits(e.target.value), setVisible(true))
              : (setVisible(false), (e.target.value = ""), e.target.focus())
          }
          onKeyDown={(e) =>
            e.key === "Escape"
              ? ((e.target.value = ""), setVisible(false), e.target.blur())
              : null
          }
          onBlur={(e) => (e.target.value = "")}
        />

        <div className="overflow-y-auto max-h-48 flex flex-col ">
          <div className={`${visible ? "" : "hidden"}`}>{diditElements}</div>
        </div>
      </div>
    </div>
  );
};

export default DiditSearch;
