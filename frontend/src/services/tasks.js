import axios from "axios";
const baseUrl = "https://todidit.herokuapp.com//api/tasks";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getTasks = async (user) => {
  const config = {
    headers: { Authorization: token },
    params: { id: user.id },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createTasks = async (task) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, task, config);
  return response.data;
};

const updateTasks = async (task) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${task.id}`, task, config);
  return response.data;
};

const deleteTasks = async (task) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${task.id}`, config);
  return response.data;
};

export default { getTasks, setToken, createTasks, updateTasks, deleteTasks };
