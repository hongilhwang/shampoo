import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  AutoSizer,
  Column,
  SortDirection,
  Table,
  defaultTableRowRenderer as DefaultTableRowRenderer
} from 'react-virtualized';
import BodyCell from '../BodyCell';
import HeadCell from '../HeadCell';
import RowExpansionRenderer from '../RowExpansionRenderer';

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  tableRow: {},
  tableBody: {
    borderBottom: '1px solid #e0e0e0'
  },
  noOutline: {
    outline: 'none'
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: 'initial'
  },
  headRow: {
    borderBottom: '1px solid #e0e0e0'
  },
  pointer: {
    cursor: 'pointer'
  }
});

export const defaultSortDirection = SortDirection.DESC;

const defaultSort = columns => {
  const canSortColumn = columns.filter(
    column => column.disableSort !== undefined && !column.disableSort
  );
  if (canSortColumn && canSortColumn.length > 0) {
    return { sortDirection: defaultSortDirection, sortBy: canSortColumn[0].dataKey };
  }

  return null;
};

const MuiVirtualizedTable = ({
  classes,
  columns,
  rows,
  rowGetter,
  onSort,
  rowExpansionRenderer,
  rowHeight,
  rowDetailHeight,
  ...tableProps
}) => {
  const { rowClassName, onRowClick, headerHeight } = tableProps;
  const [sort, setSort] = React.useState(defaultSort(columns));
  const [openRows, setOpenRows] = React.useState([]);
  const table = React.useRef();

  const getRowClassName = React.useCallback(
    ({ index }) =>
      classNames(classes.tableRow, classes.noOutline, classes.flexContainer, rowClassName, {
        [classes.tableRowHover]: index !== -1 && onRowClick != null,
        [classes.pointer]: index !== -1 && onRowClick != null
      }),
    [classes, rowClassName, onRowClick]
  );

  const getRowHight = React.useCallback(
    ({ index }) => (openRows.includes(rows[index]) ? rowHeight + rowDetailHeight : rowHeight),
    [rowHeight, rows, openRows, rowDetailHeight]
  );

  const cellRenderer = React.useCallback(
    ({ cellData, columnIndex = null, index }) => (
      <BodyCell
        className={classNames(classes.tableCell, classes.flexContainer)}
        onRowClick={onRowClick}
        style={{ height: getRowHight({ index }) }}
        columnIndex={columnIndex}
        columns={columns}
      >
        {cellData}
      </BodyCell>
    ),
    [classes, onRowClick, columns, getRowHight]
  );

  const headerRenderer = React.useCallback(
    ({ className, label, columnIndex, dataKey }) => (
      <HeadCell
        className={classNames(
          className,
          classes.noOutline,
          classes.tableCell,
          classes.flexContainer
        )}
        dataKey={dataKey}
        headerHeight={headerHeight}
        column={columns[columnIndex]}
        sort={sort}
      >
        {label}
      </HeadCell>
    ),
    [headerHeight, columns, classes, sort]
  );

  const body = React.useMemo(
    () =>
      columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
        let renderer;
        if (cellContentRenderer != null) {
          renderer = cellRendererProps =>
            cellRenderer({
              cellData: cellContentRenderer(cellRendererProps),
              columnIndex: index
            });
        } else {
          renderer = cellRenderer;
        }

        const customHeaderRenderer = headerProps =>
          headerRenderer({
            ...headerProps,
            columnIndex: index
          });

        return (
          <Column
            {...other}
            headerRenderer={customHeaderRenderer}
            className={classNames(classes.flexContainer, className)}
            cellRenderer={renderer}
            dataKey={dataKey}
            key={dataKey}
          />
        );
      }),
    [classes, columns, headerRenderer, cellRenderer]
  );

  const headerRowRenderer = React.useCallback(
    ({ className, columns: headers, style }) => (
      <div className={classNames(className, classes.headRow)} role="row" style={style}>
        {headers}
      </div>
    ),
    [classes]
  );

  // sort 가능 컬럼을 click 시 sort event를 발생 시킨다.
  const handleSort = React.useCallback(
    ({ defaultSortDirection: eventDefaultSort, event, sortBy, sortDirection }) => {
      const column = columns.filter(item => item.dataKey === sortBy)[0];

      if (!(column.disableSort === undefined || column.disableSort)) {
        setSort({ sortDirection, sortBy });
        onSort({ eventDefaultSort, event, sortBy, sortDirection });
      }

      if (openRows && openRows.length > 0) {
        setOpenRows([]);
        table.current.recomputeRowHeights(0);
      }
    },
    [onSort, setSort, columns, setOpenRows, openRows]
  );

  // row 값을 공급 한다.
  const handleRowGetter = React.useCallback(
    ({ index }) => (rowGetter ? rowGetter(index) : rows[index]),
    [rowGetter, rows]
  );

  const handleRowExpansionToggle = React.useCallback(
    ({ index, rowData }) => {
      if (openRows.includes(rowData)) {
        setOpenRows(openRows.filter(item => item !== rowData));
      } else {
        setOpenRows([...openRows, rowData]);
      }
      table.current.recomputeRowHeights(index);
    },
    [openRows, table]
  );

  const rowRenderer = React.useCallback(
    rowProps =>
      rowExpansionRenderer ? (
        <RowExpansionRenderer
          {...rowProps}
          rowHeight={rowHeight}
          rowDetailHeight={rowDetailHeight}
          onRowExpansionToggle={handleRowExpansionToggle}
          detailRenderer={rowExpansionRenderer}
          open={openRows.includes(rowProps.rowData)}
        />
      ) : (
        <DefaultTableRowRenderer {...rowProps} />
      ),
    [rowExpansionRenderer, handleRowExpansionToggle, rowHeight, rowDetailHeight, openRows]
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          ref={table}
          {...tableProps}
          rowHeight={getRowHight}
          rowCount={rows ? rows.length : 0}
          rowGetter={handleRowGetter}
          gridClassName={classNames(classes.tableBody, classes.noOutline)}
          className={classes.table}
          height={height}
          width={width}
          overscanRowCount={10}
          rowClassName={getRowClassName}
          headerRowRenderer={headerRowRenderer}
          headerClassName={classes.noOutline}
          rowRenderer={rowRenderer}
          sort={handleSort}
          {...sort}
        >
          {body}
        </Table>
      )}
    </AutoSizer>
  );
};

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  onSort: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.object),
  rowGetter: PropTypes.func,
  rowExpandRenderer: PropTypes.func,
  rowDetailHeight: PropTypes.number,
  rowExpansionRenderer: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
  rowClassName: '',
  headerHeight: 56,
  rowHeight: 56,
  onSort: () => {},
  rows: null,
  rowGetter: null,
  onRowClick: null,
  rowExpandRenderer: null,
  rowDetailHeight: 100,
  rowExpansionRenderer: null
};

export default withStyles(styles)(MuiVirtualizedTable);
