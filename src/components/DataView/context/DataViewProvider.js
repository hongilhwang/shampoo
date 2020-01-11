import React from 'react';
import DataViewContext from './DataViewContext';

const DataViewProvider = ({children}) => {

  const [state, setState] = React.useState();

  const setter = React.useCallback((data)=>{
    setState(data)
  },[]);

  React.useEffect(()=>{
  },[state]);

  return (
    <DataViewContext.Provider value={[state, setter]}>
      {children}
    </DataViewContext.Provider>
  );
};

export default DataViewProvider;
