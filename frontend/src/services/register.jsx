import axios from "axios";

const register = async (credentials) => {
  const response = await axios.post("/api/register", credentials);
  return response.data;
};

export default { register };
