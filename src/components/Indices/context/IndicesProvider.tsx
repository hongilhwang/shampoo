import React from 'react';
import IndicesContext from 'components/Indices/context/IndicesContext';
import defaultContextValue from 'components/Indices/context/DefaultContextValue';

interface IndicesProviderProps {
  children: React.ReactElement;
}

const IndicesProvider: React.FunctionComponent<IndicesProviderProps> = ({
  children
}: IndicesProviderProps) => {
  const [state, setState] = React.useState(defaultContextValue);

  const setter = React.useCallback(indices => {
    setState(indices);
  }, []);

  return <IndicesContext.Provider value={[state, setter]}>{children}</IndicesContext.Provider>;
};

export default IndicesProvider;
