import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import defaultIndices, { indexType, indicesType } from '../context/DefaultContextValue';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  selectBox: {
    position: 'relative',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
      display: 'block'
    }
  },
  autocomplete: {
    color: '#FFF'
  },
  moreButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  textField: {
    color: 'inherit',
    minWidth: 300,
    margin: '0px'
  },
  inputProps: {
    padding: theme.spacing(0, 0, 0, 2),
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  inputPropsInput: {
    color: '#FFF',
    paddingLeft: '0px'
  },
  inputNotchedOutline: {
    borderWidth: 0
  }
}));

type onChangeType = (index?: indexType) => void;
const defaultOnChangeType: onChangeType = () => {
  // onChange function
};

interface IndicesProps {
  onChange: onChangeType;
  indices: indicesType;
}

const Indices: React.FunctionComponent<IndicesProps> = ({
  onChange = defaultOnChangeType,
  indices = defaultIndices
}: IndicesProps): React.ReactElement => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(undefined);
  const sortedIndices = React.useMemo(
    () =>
      indices
        .slice()
        .sort((a, b) =>
          a.index.localeCompare(b.index, undefined, { numeric: true, sensitivity: 'base' })
        ),
    [indices]
  );

  React.useEffect(() => {
    onChange(index);
  }, [onChange, index]);

  const handleChange = React.useCallback(
    (e, text) => {
      setIndex(text);
    },
    [setIndex]
  );

  const renderInput = React.useCallback(
    params => (
      <TextField
        {...params}
        className={classes.textField}
        variant="outlined"
        placeholder="인덱스를 선택해주세요."
        margin="dense"
        InputProps={{
          ...params.InputProps,
          autoComplete: 'disabled',
          type: 'text',
          className: classes.inputProps,
          classes: {
            input: classes.inputPropsInput,
            notchedOutline: classes.inputNotchedOutline
          }
        }}
        fullWidth
      />
    ),
    [classes]
  );

  const renderOption = React.useCallback(option => <div>{option.index}</div>, []);

  return (
    <div className={classes.root}>
      <div className={classes.selectBox}>
        <Autocomplete
          className={classes.autocomplete}
          options={sortedIndices}
          getOptionLabel={option => option.index || ''}
          onChange={handleChange}
          renderInput={renderInput}
          renderOption={renderOption}
          autoHighlight
          value={index}
        />
      </div>
      <IconButton aria-label="indices 목록" className={classes.moreButton} color="inherit">
        <MoreIcon />
      </IconButton>
    </div>
  );
};

export default Indices;
