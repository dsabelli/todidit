import React, { useState, useEffect } from "react";
import Didit from "./Didit";
import DateRange from "../UI/DateRange";
import Input from "../UI/Input";
import diditService from "../../services/didits";
import { debounce } from "lodash";
import Button from "../UI/Button";

const DiditSearch = () => {
  const [didits, setDidits] = useState([]);
  const [diditDateStart, setDiditDateStart] = useState("");
  const [diditDateEnd, setDiditDateEnd] = useState("");

  const diditElements = didits.map((didit) => (
    <Didit key={didit.id} title={didit.title} />
  ));

  const getDidits = debounce(async (title) => {
    const searchedDidits = await diditService.getDidits(
      title,
      diditDateStart,
      diditDateEnd
    );
    setDidits(searchedDidits);
  }, 200);
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
          placeholder="Search"
          className="input input-bordered"
          onChange={(e) =>
            e.target.value !== ""
              ? getDidits(e.target.value)
              : (e.target.blur(), e.target.focus())
          }
          onKeyDown={(e) =>
            e.key === "Escape"
              ? (e.target.blur(), (e.target.value = ""), setDidits([]))
              : ""
          }
          onBlur={(e) => ((e.target.value = ""), setDidits([]))}
        />

        <div className="overflow-y-auto max-h-48 ">{diditElements}</div>
      </div>
    </div>
  );
};

export default DiditSearch;
