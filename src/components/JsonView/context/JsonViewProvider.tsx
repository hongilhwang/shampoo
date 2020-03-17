import React from 'react';
import JsonViewContext, { defaultContextValue } from 'components/JsonView/context/JsonViewContext';

interface JsonViewProviderProps {
  children: React.ReactElement;
}

const JsonViewProvider: React.FunctionComponent<JsonViewProviderProps> = ({
  children
}: JsonViewProviderProps) => {
  const [state, setState] = React.useState(defaultContextValue);

  const setter = React.useCallback(jsonSrc => {
    setState(jsonSrc);
  }, []);

  return <JsonViewContext.Provider value={[state, setter]}>{children}</JsonViewContext.Provider>;
};

export default JsonViewProvider;
