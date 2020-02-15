import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import UrlContext from './UrlContext';
import defaultContextValue from './DefaultContextValue';

const UrlProvider = ({ children }) => {
  const [state, setState] = React.useState(defaultContextValue);

  React.useEffect(() => {
    axios.defaults.baseURL = `${defaultContextValue.protocol}://${defaultContextValue.baseURL}:${defaultContextValue.port}`;
  }, []);

  const setter = React.useCallback(domain => {
    if (domain && domain.trim()) {
      let domainString = domain.trim();

      if (domain.indexOf('http') !== 0) {
        domainString = `http://${domainString}`;
      }

      const [protocol, baseURL, port = '9002'] = domainString.split(':');

      const url = {
        protocol,
        baseURL: baseURL.replace(/[(://)]/g, '').replace('/', ''),
        port: parseInt(port.replace(/[^0-9]/g, ''), 10)
      };

      axios.defaults.baseURL = `${url.protocol}://${url.baseURL}:${url.port}`;
      setState(url);
    }
  }, []);

  React.useEffect(() => {}, [state]);

  return <UrlContext.Provider value={[state, setter]}>{children}</UrlContext.Provider>;
};
UrlProvider.propTypes = {
  children: PropTypes.element.isRequired
};
export default UrlProvider;
