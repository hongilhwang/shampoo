import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface DataViewProps {
  data: object | object[] | string[];
}

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

const DataView: React.FunctionComponent<DataViewProps> = ({
  data
}: DataViewProps): React.ReactElement => {
  const classes = useStyles();

  return <div className={classes.root}>`테이블`</div>;
};

DataView.defaultProps = {
  data: []
};
export default DataView;
