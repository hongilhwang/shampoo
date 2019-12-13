import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { InputBase, IconButton, TextField } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import SettingsInputCompositeIcon from '@material-ui/icons/SettingsInputComposite';
import Autocomplete from '@material-ui/lab/Autocomplete';

const DEFAULT_SERVER_URL = 'http://localhost:9200';
const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  serverIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: 300,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  iconButton: {
    padding: 10,
  },
}));

const Server = () => {
//TODO : 서버 주소를 입력하고 커넥션을 하면 index 정보를 불러 온다.
  const classes = useStyles();
  const [url, setUrl] = React.useState(DEFAULT_SERVER_URL);

  const handleClickConnectServer = React.useCallback(() => {
    console.log(url);
  },[url]);
  const handleChangeServerURL = React.useCallback((e) => {
    setUrl(e.target.value);
  },[]);

  const renderInput = React.useCallback(params => {
// TODO : INPUT 박스의 underline 제거
    return (
    <>
      <div className={classes.serverIcon}>
        <LinkIcon />
      </div>
      <TextField
        {...params}
        placeholder="Server URL"
        className={classes.inputRoot}
        InputProps={
          {
            ...params.InputProps,
            type: 'search',
            className : classes.inputInput,
          }
        }
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={handleClickConnectServer}>
        <SettingsInputCompositeIcon style={{color: '#FFF'}}/>
      </IconButton>
    </>
  )},[classes, handleChangeServerURL, handleClickConnectServer]);

  return (
    <div className={classes.root}>
      <Autocomplete
        freeSolo
        options={['A','B']}
        renderInput={renderInput}
        value={url}
      />
    </div>
  );
};

export default Server;
