import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useDataView from '../hooks/useDataView';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

const DataView = () => {
  const classes = useStyles();
  const [data = []] = useDataView();

  return <div className={classes.root}>`테이블${data.length}`</div>;
};

export default DataView;
