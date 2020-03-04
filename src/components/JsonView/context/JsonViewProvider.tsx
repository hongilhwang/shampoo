import React from 'react';
import PropTypes from 'prop-types';
import JsonViewContext from 'components/JsonView/context/JsonViewContext';

const JsonViewProvider = ({ children }) => {
  const [state, setState] = React.useState('');

  const setter = React.useCallback(jsonSrc => {
    setState(jsonSrc);
  }, []);

  React.useEffect(() => {}, [state]);

  return <JsonViewContext.Provider value={[state, setter]}>{children}</JsonViewContext.Provider>;
};

JsonViewProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default JsonViewProvider;
