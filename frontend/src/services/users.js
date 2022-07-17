import axios from "axios";
const baseUrl = "/api/users";

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

const deleteUser = async (user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.delete(`${baseUrl}/${user.id}`, config);
  return response.data;
};
export default { deleteUser, updateUser, getUser };
