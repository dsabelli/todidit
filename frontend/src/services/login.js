import axios from "axios";

const login = async (credentials) => {
  const response = await axios.post(
    "https://todidit.onrender.com/api/login",
    credentials
  );
  return response.data;
};

export default { login };
