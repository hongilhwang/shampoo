import React from 'react';

import DataView from 'components/DataView';
import JsonView from 'components/JsonView';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const DataViewer = () => {
  const classes = useStyles();
  const rootData = useSelector(state => state.data.root);
  const resultData = useSelector(state => state.data.result);

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Grid 뷰어</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <DataView data={resultData || rootData} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Json 뷰어</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <JsonView data={resultData || rootData} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

DataViewer.propTypes = {};

DataViewer.defaultProps = {};

export default DataViewer;
