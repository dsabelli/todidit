import axios from "axios";

const checkEmail = async (data) => {
  console.log(data.email);
  const response = await axios.get("/api/register", {
    params: { email: data.email },
  });
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post("/api/register", credentials);
  return response.data;
};

export default { register, checkEmail };
