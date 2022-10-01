import axios from "axios";
const baseUrl = "https://todidit.herokuapp.com//api/notes";

const getNotes = async (user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
    params: { id: user.id },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getTimeMachineNotes = async (createdOn, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
    params: {
      dateC: createdOn,
      id: user.id,
    },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createNotes = async (note, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.post(baseUrl, note, config);
  return response.data;
};

const updateNotes = async (note, user) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` },
  };
  const response = await axios.put(`${baseUrl}/${note.id}`, note, config);
  return response.data;
};

export default {
  getNotes,
  getTimeMachineNotes,
  createNotes,
  updateNotes,
};
