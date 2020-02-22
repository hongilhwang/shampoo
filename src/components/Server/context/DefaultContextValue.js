export default {
  protocol: process.env.REACT_APP_DEFAULT_PROTOCOL || 'http',
  baseURL: process.env.REACT_APP_DEFAULT_URL || 'localhost',
  port: parseInt(process.env.REACT_APP_DEFAULT_PORT, 10) || 9200
};
