import axios from "axios";

const getRoot = () => {
  return axios.get('');
};


const getIndices = () => {
  return axios.get('/_cat/indices?format=json');
};

export default ({
  getRoot,
  getIndices
});

