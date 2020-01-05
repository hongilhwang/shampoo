import axios from "axios";


const getRoot = (url) => {
  return axios.get(url);
};

export default ({
  getRoot
});

