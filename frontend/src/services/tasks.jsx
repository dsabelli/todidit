import axios from "axios";
const baseUrl = "/api/tasks";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getTasks = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createTasks = async (task) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, task, config);
  return response.data;
};

export default { getTasks, setToken, createTasks };
