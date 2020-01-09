import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBox from './InputBox';
import useBaseURL from '../hooks/useBaseURL';
import PropTypes from 'prop-types';

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
}));

const Server = ({onConnect}) => {
  const classes = useStyles();
  const [connected, setConnected] = React.useState(false);
  const [server, setServer] = useBaseURL();
  const [currentInputBoxText, setCurrentInputBoxText] = React.useState(`${server.protocol}://${server.baseURL}:${server.port}`);

  const handleConnectedResult = React.useCallback((result)=>{
    setConnected(result);
  },[setConnected]);

  const handleClickConnectServer = React.useCallback(() => {
    onConnect(handleConnectedResult);
  },[onConnect, handleConnectedResult]);
  const handleChangeServerURL = React.useCallback((e, text) => {
    setServer(text);
  },[setServer]);
  const handleBlurInputBox = React.useCallback((e)=>{
    setServer(e.target.value);
  },[setServer]);

  React.useEffect(()=>{
    onConnect(handleConnectedResult);
  },[server, onConnect, handleConnectedResult]);

  const renderInput = React.useCallback(params =>(
    <InputBox autocompleteParams={params} onClick={handleClickConnectServer} connected={connected}/>
  ),[handleClickConnectServer, connected]);

  const handleKeyPress = React.useCallback((e)=>{
    setCurrentInputBoxText(e.target.value);
  },[]);

  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.autocomplete}
        freeSolo
        options={DUMMY_OPTIONS}
        renderInput={renderInput}
        onChange={handleChangeServerURL}
        onBlur={handleBlurInputBox}
        onKeyPress={handleKeyPress}
        defaultValue={currentInputBoxText}
        value={currentInputBoxText}
      />
    </div>
  );
};

Server.propTypes = {
  onConnect : PropTypes.func
};
Server.defaultProps = {
  onConnect: ()=> {console.log('Not found function.');}
};

export default Server;
