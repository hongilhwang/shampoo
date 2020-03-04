import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import PropTypes from 'prop-types';

const DRAG_ZONE_SIZE = 80;

const styles = {
  root: {},
  dragZone: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: `${DRAG_ZONE_SIZE}px`,
    bottom: '0'
  },
  dragHandler: {
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: `${DRAG_ZONE_SIZE / 5}px`,
    border: '1px solid #DDD',
    borderRadius: `${DRAG_ZONE_SIZE / 5 / 3}px`,
    cursor: 'row-resize',
    '&:hover': {
      backgroundColor: '#EEE'
    }
  },
  pointEventIgnore: {
    pointerEvents: 'none'
  }
};

const Draggable = ({ classes, width, height, children }) => {
  const UNIT = React.useMemo(() => height.replace(/[0-9]/g, ''), [height]);
  const [containerHeight, setContainerHeight] = React.useState(
    parseInt(height.replace(/[^0-9]/g, ''), 10)
  );
  const rootStyle = React.useMemo(
    () => ({
      height: containerHeight + UNIT,
      width,
      paddingBottom: DRAG_ZONE_SIZE
    }),
    [containerHeight, UNIT, width, DRAG_ZONE_SIZE]
  );
  const [beforePos, setBeforePos] = React.useState(0);
  const [flagDrag, setFlagDrag] = React.useState(false);

  const handleResizeMove = React.useCallback(
    event => {
      if (flagDrag) {
        const d = event.clientY - beforePos;
        setBeforePos(event.clientY);
        setContainerHeight(containerHeight + d);
      }
    },
    [beforePos, containerHeight, flagDrag]
  );

  const handleResizeDragStarter = React.useCallback(
    event => {
      setBeforePos(event.clientY);
      setFlagDrag(true);
    },
    [setBeforePos, setFlagDrag]
  );

  const handleResizeDragStop = React.useCallback(() => {
    setFlagDrag(false);
  }, [setFlagDrag]);

  const handleDragZoneDoubleClick = React.useCallback(() => {
    setContainerHeight(containerHeight + 200);
  }, [containerHeight, setContainerHeight]);

  return (
    <div
      className={classes.root}
      role="button"
      tabIndex={0}
      style={rootStyle}
      onMouseUp={handleResizeDragStop}
      onMouseLeave={handleResizeDragStop}
    >
      {children}
      <div className={classes.dragZone} onMouseMove={handleResizeMove}>
        <div
          role="button"
          tabIndex={0}
          className={classNames(classes.dragHandler)}
          onMouseDown={handleResizeDragStarter}
          onMouseMove={handleResizeMove}
          onDoubleClick={handleDragZoneDoubleClick}
        >
          <DragHandleIcon className={classes.pointEventIgnore} />
        </div>
      </div>
    </div>
  );
};

Draggable.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    dragZone: PropTypes.string,
    dragHandler: PropTypes.string,
    pointEventIgnore: PropTypes.string
  }).isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.element.isRequired
};

Draggable.defaultProps = {
  width: '100%',
  height: '500px'
};

export default withStyles(styles)(Draggable);
