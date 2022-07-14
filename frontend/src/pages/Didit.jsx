import React from "react";
import { useParams } from "react-router-dom";

const Didit = () => {
  let params = useParams();
  return <div>Didit {params.id}</div>;
};

export default Didit;
