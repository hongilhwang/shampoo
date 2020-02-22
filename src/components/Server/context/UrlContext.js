import React from 'react';
import defaultContextValue from './DefaultContextValue';

const defaultContext = [defaultContextValue, () => {}];

export default React.createContext(defaultContext);
