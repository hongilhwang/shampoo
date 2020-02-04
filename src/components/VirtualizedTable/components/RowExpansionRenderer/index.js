import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Loader } from '@kakao/9rum-ui-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const styles = {
  root: {
    outline: 'none'
  },
  row: {
    position: 'relative !important',
    left: '0 !important',
    top: '0 !important'
  },
  detail: {
    padding: '0 !important',
    position: 'relative !important',
    left: '0 !important',
    top: '0 !important'
  },
  hidden: {
    display: 'none !important'
  }
};

const RowExpansionRenderer = ({
  classes,
  className,
  detailRenderer,
  columns,
  index,
  onRowClick,
  onRowDoubleClick,
  onRowMouseOut,
  onRowMouseOver,
  onRowRightClick,
  onRowExpansionToggle,
  rowData,
  rowHeight,
  rowDetailHeight,
  open,
  style
}) => {
  const [detail, setDetail] = React.useState(<Loader width="30px" />);
  const a11yProps = { 'aria-rowindex': index + 1 };

  if (onRowClick || onRowDoubleClick || onRowMouseOut || onRowMouseOver || onRowRightClick) {
    a11yProps['aria-label'] = 'row';

    if (onRowClick) {
      a11yProps.onClick = event => {
        onRowExpansionToggle({ index, rowData });
        onRowClick({ event, index, rowData });
      };
    }
    if (onRowDoubleClick) {
      a11yProps.onDoubleClick = event => onRowDoubleClick({ event, index, rowData });
    }
    if (onRowMouseOut) {
      a11yProps.onMouseOut = event => onRowMouseOut({ event, index, rowData });
    }
    if (onRowMouseOver) {
      a11yProps.onMouseOver = event => onRowMouseOver({ event, index, rowData });
    }
    if (onRowRightClick) {
      a11yProps.onContextMenu = event => onRowRightClick({ event, index, rowData });
    }
  }

  const detailGetter = React.useCallback(async () => {
    const contents = await detailRenderer({ index, rowData });
    setDetail(contents);
  }, [detailRenderer, index, rowData]);

  React.useEffect(() => {
    if (open) {
      detailGetter();
    }
  }, [index, rowData, detailGetter, open]);

  return (
    <div
      className={classes.root}
      role="row"
      aria-rowindex={a11yProps['aria-rowindex']}
      aria-label={a11yProps['aria-label']}
      onClick={a11yProps.onClick}
      onDoubleClick={a11yProps.onDoubleClick}
      onMouseOut={a11yProps.onMouseOut}
      onMouseOver={a11yProps.onMouseOver}
      onContextMenu={a11yProps.onContextMenu}
      style={style}
    >
      <div className={classNames(classes.row, className)} style={{ ...style, height: rowHeight }}>
        {columns}
      </div>
      <div
        className={classNames(classes.detail, {
          [classes.hidden]: !open
        })}
        style={{ ...style, height: rowDetailHeight }}
      >
        {detail}
      </div>
    </div>
  );
};

RowExpansionRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  detailRenderer: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number.isRequired,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  onRowMouseOut: PropTypes.func,
  onRowMouseOver: PropTypes.func,
  onRowRightClick: PropTypes.func,
  onRowExpansionToggle: PropTypes.func,
  rowData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  rowHeight: PropTypes.number.isRequired,
  rowDetailHeight: PropTypes.number.isRequired,
  open: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object])
};

RowExpansionRenderer.defaultProps = {
  className: '',
  columns: [],
  onRowClick: () => {},
  onRowDoubleClick: () => {},
  onRowMouseOut: () => {},
  onRowMouseOver: () => {},
  onRowRightClick: () => {},
  onRowExpansionToggle: () => {},
  open: false,
  style: {}
};

export default withStyles(styles)(RowExpansionRenderer);
