import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBox from './InputBox';
import { useJsonView } from 'components/JsonView';
import useBaseURL from '../hooks/useBaseURL';
import apis from 'apis';

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
  const [server, setServer] = useBaseURL();
  const [jsonViewSource, setJsonViewSource] = useJsonView();

  const handleConnectServer = React.useCallback(async ()=>{
    //TODO : api 사용부는 API 디렉토리에 저장한다.
    //TODO : url은 useContext로 관리할까???....그렇게 된다면 어떻게 될까??? 리덕스 도입??
    const response = await apis.getRoot();
    console.log('response',response);
    setJsonViewSource(response);
  },[setJsonViewSource]);

  const handleClickConnectServer = React.useCallback(() => {
    console.log(server);
  },[server]);
  const handleChangeServerURL = React.useCallback((e, text) => {
    setServer(text);
  },[]);
  const handleBlurInputBox = React.useCallback((e)=>{
    setServer(e.target.value);
  },[setServer]);

  React.useEffect(()=>{
    handleConnectServer();
  },[server, handleConnectServer]);

  const renderInput = React.useCallback(params =>(
    <InputBox autocompleteParams={params} onClick={handleClickConnectServer}/>
  ),[handleClickConnectServer]);

  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.autocomplete}
        freeSolo
        options={DUMMY_OPTIONS}
        renderInput={renderInput}
        onChange={handleChangeServerURL}
        onBlur={handleBlurInputBox}
        defaultValue={DEFAULT_SERVER_URL}
        value={`${server.protocol}://${server.baseURL}:${server.port}`}
      />
    </div>
  );
};

export default Server;
