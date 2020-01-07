import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, Select, MenuItem} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  selectBox: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  moreButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  }
}));

const Indices = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Select
        className={classes.selectBox}
        value={''}
        onChange={()=>{}}
        color="inherit"
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <IconButton  aria-label="indices 목록" className={classes.moreButton} color="inherit">
        <MoreIcon />
      </IconButton>
    </div>
  );
};

export default Indices;
