import axios from "axios";

const verifyEmail = async (token) => {
  const response = await axios.get(
    `https://todidit.onrender.com/api/register/verify/${token}`,
    {
      params: { token: token },
    }
  );
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(
    "https://todidit.onrender.com/api/register",
    credentials
  );
  return response.data;
};

export default { register, verifyEmail };
