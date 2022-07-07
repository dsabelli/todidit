import axios from "axios";
const baseUrl = "/api/didits";

// const getDidits = async (user) => {
//   const config = {
//     params: { id: user.id },
//   };
//   const response = await axios.get(baseUrl, config);
//   return response.data;
// };

const getDidits = async (diditTitle) => {
  const config = {
    params: {
      title: diditTitle,
      // dateA: new Date(2022, 5, 5),
      // dateB: new Date(),
    },
  };
  const response = await axios.get(baseUrl, config);
  console.log(response.data);
  return response.data;
};

const createDidits = async (didit, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.post(baseUrl, didit, config);
  return response.data;
};

export default { getDidits, createDidits };
