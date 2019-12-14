import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import SettingsInputCompositeIcon from '@material-ui/icons/SettingsInputComposite';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

const DEFAULT_SERVER_URL = 'http://localhost:9200';
const DUMMY_OPTIONS = [];

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
  autocomplete:{
    display: 'flex',
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
    margin: '0px',
  },
  inputProps: {
    padding: theme.spacing(0, 0, 0, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  inputPropsInput: {
    paddingLeft: '0px'
  },
  iconButton: {
    padding: '5px',
  },
  inputNotchedOutline : {
    borderWidth: 0
  }
}));

const Server = () => {
  const classes = useStyles();
  const [url, setUrl] = React.useState(DEFAULT_SERVER_URL);

  const handleConnectServer = React.useCallback(async (url)=>{
    //TODO : api 사용부는 API 디렉토리에 저장한다.
    //TODO : url은 useContext로 관리할까???....그렇게 된다면 어떻게 될까??? 리덕스 도입??
    const response = await axios.get(url);
  },[]);

  const handleClickConnectServer = React.useCallback(() => {
    console.log(url);
  },[url]);
  const handleChangeServerURL = React.useCallback((e, text) => {
    setUrl(text);
  },[]);

  React.useEffect(()=>{
    handleConnectServer(url);
  },[url]);

  const renderInput = React.useCallback(params =>(
    <>
      <div className={classes.serverIcon}>
        <LinkIcon />
      </div>
      <TextField
        {...params}
        placeholder="Server URL"
        className={classes.inputRoot}
        variant={"outlined"}
        margin="dense"
        InputProps={
          {
            ...params.InputProps,
            type: 'text',
            className : classes.inputProps,
            classes: {
              input: classes.inputPropsInput,
              notchedOutline : classes.inputNotchedOutline
            }
          }
        }
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={handleClickConnectServer}>
        <SettingsInputCompositeIcon style={{color: '#FFF'}}/>
      </IconButton>
    </>
  ),[classes, handleClickConnectServer]);

  const autoComplate = React.useMemo(()=>(
    <Autocomplete
      className={classes.autocomplete}
      freeSolo
      options={DUMMY_OPTIONS}
      renderInput={renderInput}
      onChange={handleChangeServerURL}
      defaultValue={DEFAULT_SERVER_URL}
      value={url}
    />
  ),[url, DUMMY_OPTIONS]);

  return (
    <div className={classes.root}>
      {autoComplate}
    </div>
  );
};

export default Server;
