import React from 'react';
import PropTypes from 'prop-types';
import stringToServer from 'utils/stringToServer';
import UrlContext from './UrlContext';
import defaultContextValue from './DefaultContextValue';

const UrlProvider = ({ children }) => {
  const [state, setState] = React.useState(defaultContextValue);

  const setter = React.useCallback(
    domain => {
      const url = stringToServer(domain);
      setState(url);
    },
    [setState]
  );

  return <UrlContext.Provider value={[state, setter]}>{children}</UrlContext.Provider>;
};
UrlProvider.propTypes = {
  children: PropTypes.element.isRequired
};
export default UrlProvider;
