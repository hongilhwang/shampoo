import React from 'react';
import stringToServer from 'utils/stringToServer';
import UrlContext, { defaultServerValue, ServerType } from 'components/Server/context/UrlContext';

interface UrlProviderProps {
  children: React.ReactChildren;
}
const UrlProvider: React.FunctionComponent<UrlProviderProps> = ({ children }: UrlProviderProps) => {
  const [state, setState] = React.useState(defaultServerValue);

  const setter = React.useCallback(
    domain => {
      const url: ServerType = stringToServer(domain);
      setState(url);
    },
    [setState]
  );

  return <UrlContext.Provider value={[state, setter]}>{children}</UrlContext.Provider>;
};

export default UrlProvider;
