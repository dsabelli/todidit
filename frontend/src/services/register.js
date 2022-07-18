import axios from "axios";

const verifyEmail = async (token) => {
  console.log(token);
  const response = await axios.get(`/api/register/verify/${token}`, {
    params: { token: token },
  });
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post("/api/register", credentials);
  return response.data;
};

export default { register, verifyEmail };
