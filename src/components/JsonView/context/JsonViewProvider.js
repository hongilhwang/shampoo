import React from 'react';
import JsonViewContext from './JsonViewContext';

const JsonViewProvider = ({children}) => {

  const [state, setState] = React.useState('');

  const setter = React.useCallback((jsonSrc)=>{
    setState(jsonSrc);
  },[]);

  React.useEffect(()=>{
  },[state]);

  console.log(children);
  console.log('aaaa');

  return (
    <JsonViewContext.Provider value={[state, setter]}>
      {children}
    </JsonViewContext.Provider>
  );
};

export default JsonViewProvider;
