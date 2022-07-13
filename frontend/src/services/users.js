import axios from "axios";
const baseUrl = "/api/users";

const deleteUser = async (user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.delete(`${baseUrl}/${user.id}`, config);
  return response.data;
};
export default { deleteUser };
