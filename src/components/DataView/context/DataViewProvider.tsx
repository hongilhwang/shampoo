import React from 'react';
import PropTypes from 'prop-types';
import DataViewContext from './DataViewContext';

const DataViewProvider = ({ children }) => {
  const [state, setState] = React.useState();

  const setter = React.useCallback(data => {
    setState(data);
  }, []);

  React.useEffect(() => {}, [state]);

  return <DataViewContext.Provider value={[state, setter]}>{children}</DataViewContext.Provider>;
};

DataViewProvider.propTypes = {
  children: PropTypes.element
};
DataViewProvider.defaultProps = {
  children: undefined
};

export default DataViewProvider;
