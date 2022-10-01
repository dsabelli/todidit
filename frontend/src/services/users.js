import axios from "axios";
const baseUrl = "https://todidit-production.up.railway.app/api/users";

const resetPassword = async (email) => {
  const response = await axios.post(baseUrl, email);
  return response.data;
};

const getUser = async (user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.get(`${baseUrl}/${user.id}`, config);
  return response.data;
};

const updateUser = async (update, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.put(`${baseUrl}/${user.id}`, update, config);
  return response.data;
};

const confirmReset = async (password, token) => {
  // const config = {
  //   headers: { Authorization: `bearer ${user.token}` },
  // };
  const response = await axios.put(
    `${baseUrl}/confirm-reset/${token}`,
    password
  );
  return response.data;
};

const deleteUser = async (user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.delete(`${baseUrl}/${user.id}`, config);
  return response.data;
};
export default {
  deleteUser,
  updateUser,
  getUser,
  resetPassword,
  confirmReset,
};
