import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

const DataView = ({ data }) => {
  const classes = useStyles();

  return <div className={classes.root}>`테이블${data.length}`</div>;
};

DataView.propTypes = {
  data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
};

DataView.defaultProps = {
  data: []
};
export default DataView;
