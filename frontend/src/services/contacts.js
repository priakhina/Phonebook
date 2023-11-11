import axios from 'axios';

const BASE_URL = 'http://localhost:3001/contacts';

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

const create = (newContact) => {
  const request = axios.post(BASE_URL, newContact);
  return request.then((response) => response.data);
};

const update = (id, updatedContact) => {
  const request = axios.put(`${BASE_URL}/${id}`, updatedContact);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
