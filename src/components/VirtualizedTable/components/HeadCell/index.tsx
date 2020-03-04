import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SortDirection } from 'react-virtualized';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const styles = {
  root: {
    borderBottom: '0px'
  },
  noClick: {
    cursor: 'initial'
  },
  sortLabel: {
    outline: 'none',
    cursor: 'pointer'
  }
};

const HeadCell = ({ classes, className, children, dataKey, height, column, sort }) => {
  const direction = {
    [SortDirection.ASC]: 'asc',
    [SortDirection.DESC]: 'desc'
  };
  const sortFlag = !(column.disableSort === undefined || column.disableSort) && sort != null;

  const inner = sortFlag ? (
    <TableSortLabel
      className={classes.sortLabel}
      active={dataKey === sort.sortBy}
      direction={direction[sort.sortDirection]}
    >
      {children}
    </TableSortLabel>
  ) : (
    children
  );

  return (
    <TableCell
      component="div"
      className={classNames(classes.root, className, {
        [classes.noClick]: !sortFlag
      })}
      variant="head"
      style={{ height }}
      align={column.numeric || false ? 'right' : 'left'}
    >
      {inner}
    </TableCell>
  );
};

HeadCell.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  className: PropTypes.string,
  column: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dataKey: PropTypes.string.isRequired,
  height: PropTypes.string,
  sort: PropTypes.shape({
    sortBy: PropTypes.string,
    sortDirection: PropTypes.oneOf([SortDirection.ASC, SortDirection.DESC])
  })
};

HeadCell.defaultProps = {
  className: '',
  sort: null,
  height: null
};

export default withStyles(styles)(HeadCell);
