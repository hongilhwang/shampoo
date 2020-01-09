import axios from "axios";

const getRoot = () => {
  return axios.get('');
};


const getIndices = () => {
  return axios.get('/_cat/indices?format=json');
};

const getData = (index) => axios.get(`${index}/_search?q=*`);

export default ({
  getRoot,
  getIndices,
  getData
});

