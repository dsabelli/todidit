import axios from "axios";
const baseUrl = "https://todidit.onrender.com/api/projects";

const getProjects = async (user) => {
  const config = {
    params: { id: user.id },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createProjects = async (project, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.post(baseUrl, project, config);
  return response.data;
};

const updateProjects = async (project, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.put(`${baseUrl}/${project.id}`, project, config);
  return response.data;
};

const deleteProjects = async (project, user) => {
  const config = { headers: { Authorization: `bearer ${user.token}` } };
  const response = await axios.put(`${baseUrl}/${project.id}`, project, config);
  return response.data;
};

export default { getProjects, createProjects, updateProjects, deleteProjects };
