import React from 'react';
import { Link as LinkIcon, LinkOff as LinkOffIcon } from '@material-ui/icons';
import { IconButton, TextField } from '@material-ui/core';
import SettingsInputCompositeIcon from '@material-ui/icons/SettingsInputComposite';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  serverIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: 300,
    margin: '0px'
  },
  inputProps: {
    padding: theme.spacing(0, 0, 0, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
  inputPropsInput: {
    color: '#FFF',
    paddingLeft: '0px'
  },
  iconButton: {
    padding: '5px'
  },
  inputNotchedOutline: {
    borderWidth: 0
  }
}));

const InputBox = ({ autocompleteParams, onClick, connected }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.serverIcon}>{connected ? <LinkIcon /> : <LinkOffIcon />}</div>
      <TextField
        {...autocompleteParams}
        placeholder="Server URL"
        className={classes.inputRoot}
        variant={'outlined'}
        margin="dense"
        InputProps={{
          ...autocompleteParams.InputProps,
          type: 'text',
          className: classes.inputProps,
          classes: {
            input: classes.inputPropsInput,
            notchedOutline: classes.inputNotchedOutline
          }
        }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={onClick}
      >
        <SettingsInputCompositeIcon style={{ color: '#FFF' }} />
      </IconButton>
    </>
  );
};

export default InputBox;
