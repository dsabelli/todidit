import React from "react";
import { useParams } from "react-router-dom";

const Project = () => {
  let params = useParams();
  return <div>Project {params.id}</div>;
};

export default Project;
