import React from "react";

const DiditSearch = () => {
  const [didits, setDidits] = useState([]);
  const [diditTitle, setDiditTitle] = useState("");
  const [diditDateStart, setDiditDateStart] = useState("");
  const [diditDateEnd, setDiditDateEnd] = useState("");

  const getDidits = async (diditTitle) => {
    if (diditTitle) {
      const didits = await diditService.getDidits(
        diditTitle,
        diditDateStart,
        diditDateEnd
      );
      setDiditTitle(didits);
      // } else if ((diditDateStart, diditDateEnd)) {
      //   const didits = await diditService.getDidits(
      //     (diditTitle = ""),
      //     diditDateStart,
      //     diditDateEnd
      //   );
      //   setDiditTitle(didits);
    } else {
      setDiditTitle("");
    }
  };

  return <div>DiditSearch</div>;
};

export default DiditSearch;
