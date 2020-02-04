import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const styles = {
  root: {},
  noClick: {
    cursor: 'initial'
  }
};

const BodyCell = ({
  className,
  classes,
  children,
  columnIndex,
  onRowClick = null,
  columns,
  style
}) => {
  return (
    <TableCell
      component="div"
      className={classNames(classes.root, className, {
        [classes.noClick]: onRowClick == null
      })}
      variant="body"
      style={style}
      align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
    >
      {children}
    </TableCell>
  );
};

BodyCell.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.number, PropTypes.string]).isRequired,
  onRowClick: PropTypes.func,
  columnIndex: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object),
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
};

BodyCell.defaultProps = {
  className: '',
  onRowClick: null,
  columns: [],
  style: null
};

export default withStyles(styles)(BodyCell);
