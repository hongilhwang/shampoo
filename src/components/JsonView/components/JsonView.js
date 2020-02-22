import React from 'react';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';

const JsonView = ({ data }) => {
  return <ReactJson src={data} />;
};

JsonView.propTypes = {
  data: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.arrayOf(PropTypes.any)])
};

JsonView.defaultProps = {
  data: {}
};

export default JsonView;
