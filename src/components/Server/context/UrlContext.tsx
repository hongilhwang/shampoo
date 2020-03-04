import React from 'react';
import defaultContextValue from 'components/Server/context/DefaultContextValue';

const defaultContext = [defaultContextValue, () => {}];

export default React.createContext(defaultContext);
