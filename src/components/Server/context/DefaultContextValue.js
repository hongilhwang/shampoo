export default ({
  protocol : process.env.REACT_APP_DEFAULT_PROTOCOL || 'http',
  baseURL : process.env.REACT_APP_DEFAULT_URL || 'localhost',
  port : process.env.REACT_APP_DEFAULT_PORT || 9200
});



