import axios from "axios";
const baseUrl = "/api/didits";

const getDidits = async (
  diditTitle,
  completedOnStart,
  completedOnEnd,
  user,
  createdOn
) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
    params: {
      title: diditTitle,
      dateA: completedOnStart,
      dateB: completedOnEnd,
      dateC: createdOn,
    },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getTimeMachineTasks = async (createdOn, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
    params: {
      dateC: createdOn,
    },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getArchivedProject = async (id, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
    params: {
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
  return response.data;
};

export default {
  getDidits,
  createDidits,
  getArchivedProject,
  getTimeMachineTasks,
};
