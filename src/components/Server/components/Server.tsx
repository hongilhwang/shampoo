import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBox from 'components/Server/components/InputBox';
import { ServerType, defaultServerValue } from '../context/UrlContext';

const DUMMY_OPTIONS: object[] = [];

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  autocomplete: {
    display: 'flex'
  }
}));

type OnConnectType = (text?: string) => void;
type OnChangeType = (text?: string) => void;

interface ServerProps {
  onConnect: OnConnectType;
  onChange: OnChangeType;
  server: ServerType;
  connected: boolean;
}

const Server: React.FunctionComponent<ServerProps> = ({
  onConnect,
  onChange,
  server = defaultServerValue,
  connected = false
}: ServerProps) => {
  const classes = useStyles();
  const [currentInputBoxText, setCurrentInputBoxText] = React.useState(
    `${server.protocol}://${server.baseURL}:${server.port}`
  );

  const handleChangeServerURL = React.useCallback(
    (e, text) => {
      onChange(text);
    },
    [onChange]
  );
  const handleBlurInputBox = React.useCallback(
    e => {
      onChange(e.target.value);
    },
    [onChange]
  );
  const handleClickConnectServer = React.useCallback(() => {
    onConnect(currentInputBoxText);
  }, [onConnect, currentInputBoxText]);

  const renderInput = React.useCallback(
    params => (
      <InputBox
        autocompleteParams={params}
        onClick={handleClickConnectServer}
        connected={connected}
      />
    ),
    [handleClickConnectServer, connected]
  );

  const handleKeyPress = React.useCallback(
    e => {
      setCurrentInputBoxText(e.target.value);
    },
    [setCurrentInputBoxText]
  );

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
export default Server;
