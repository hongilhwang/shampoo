import React from 'react';
import DataViewContext from './DataViewContext';

interface DataViewProviderProps {
  children?: React.ReactChildren;
}

const DataViewProvider: React.FunctionComponent<DataViewProviderProps> = ({
  children
}: DataViewProviderProps): React.ReactElement => {
  const [state, setState] = React.useState();

  const setter = React.useCallback(data => {
    setState(data);
  }, []);

  return <DataViewContext.Provider value={[state, setter]}>{children}</DataViewContext.Provider>;
};

DataViewProvider.defaultProps = {
  children: undefined
};

export default DataViewProvider;
