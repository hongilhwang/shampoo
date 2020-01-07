import React from 'react';
import IndicesContext from 'components/Indices/context/IndicesContext';
import defaultContextValue from 'components/Indices/context/DefaultContextValue';

const IndicesProvider = ({children}) => {

  const [state, setState] = React.useState(defaultContextValue);

  const setter = React.useCallback((indices)=>{
    setState(indices)
  },[]);

  React.useEffect(()=>{
  },[state]);

  return (
    <IndicesContext.Provider value={[state, setter]}>
      {children}
    </IndicesContext.Provider>
  );
};

export default IndicesProvider;
