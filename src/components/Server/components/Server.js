import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import InputBox from './InputBox';
import DefaultContextValue from '../context/DefaultContextValue';

const DUMMY_OPTIONS = [];

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

const Server = ({ onConnect, onChange, server, connected }) => {
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
    onConnect();
  }, [onConnect]);

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

Server.propTypes = {
  connected: PropTypes.bool,
  onConnect: PropTypes.func,
  onChange: PropTypes.func,
  server: PropTypes.shape({
    protocol: PropTypes.string,
    baseURL: PropTypes.string,
    port: PropTypes.number
  })
};
Server.defaultProps = {
  connected: false,
  onConnect: () => {},
  onChange: text => text,
  server: DefaultContextValue
};

export default Server;
