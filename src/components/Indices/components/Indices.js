import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, Select, MenuItem} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import useIndices from "../hooks/useIndices";
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
  const [index, setIndex] = React.useState('');
  const [indices, setIndices] = useIndices();

  const sortedIndices = React.useMemo(()=>indices.sort((a,b) => (a.index.localeCompare(b.index, undefined, {numeric: true, sensitivity: 'base'}))),[indices]);

  const menuItems = React.useMemo(
    ()=>(
      sortedIndices.map(item =><MenuItem value={item.index} key={item.index}>{item.index}</MenuItem> )
    )
  ,[sortedIndices]);

  return (
    <div className={classes.root}>
      <Select
        className={classes.selectBox}
        value={index}
        onChange={(e)=>{
          setIndex(e.target.value);
        }}
        color="primary"
      >
        <MenuItem value={''} key={'empty'}><em>{'인덱스를 선택해주세요.'}</em></MenuItem>
        {menuItems}
      </Select>
      <IconButton  aria-label="indices 목록" className={classes.moreButton} color="inherit">
        <MoreIcon />
      </IconButton>
    </div>
  );
};

export default Indices;
