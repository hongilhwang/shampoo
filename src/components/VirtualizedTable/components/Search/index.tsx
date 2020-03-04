import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
};

const Search = ({ classes, rows, columns, onFilter }) => {
  const [text, setText] = React.useState('');

  const keys = React.useMemo(
    () => columns.filter(column => column.search).map(column => column.dataKey),
    [columns]
  );

  const handleSearch = React.useCallback(() => {
    const retrieved = rows.filter(
      row => keys.filter(key => String(row[key]).indexOf(text) > -1).length > 0
    );
    onFilter({ text, keys, rows: retrieved });
  }, [text, rows, keys, onFilter]);

  const handleOnChange = React.useCallback(
    e => {
      setText(e.target.value);
    },
    [setText]
  );

  const handleOnKeyDown = React.useCallback(
    e => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const searchButton = React.useMemo(
    () => (
      <IconButton onClick={handleSearch}>
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      </IconButton>
    ),
    [handleSearch]
  );

  return (
    <div className={classes.root}>
      <Input
        type="text"
        value={text}
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        endAdornment={searchButton}
      />
    </div>
  );
};

Search.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  onFilter: PropTypes.func.isRequired
};
Search.defaultProps = {
  rows: [],
  columns: []
};

export default withStyles(styles)(Search);
