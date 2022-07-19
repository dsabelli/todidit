import axios from "axios";
const baseUrl = "/api/didits";

const getDidits = async (diditTitle, diditDateStart, diditDateEnd, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
    params: {
      user: user.id,
      title: diditTitle,
      dateA: diditDateStart,
      dateB: diditDateEnd,
    },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};
const getArchivedProject = async (id, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
    params: {
      user: user.id,
      project: id,
    },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};
const createDidits = async (didit, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.post(baseUrl, didit, config);
  console.log(response.data);
  return response.data;
};

export default { getDidits, createDidits, getArchivedProject };
