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

export default { getTasks, setToken };
