import axios from "axios";
const baseUrl = "/api/didits";

const getDidits = async (user) => {
  const config = {
    params: { id: user.id },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createDidits = async (task, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.post(baseUrl, task, config);
  return response.data;
};

export default { getDidits, createDidits };
