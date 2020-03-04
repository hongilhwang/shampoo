import React from 'react';
import defaultContextValue from 'components/Indices/context/DefaultContextValue'

const defaultContext = [defaultContextValue, ()=>{}];

export default React.createContext(defaultContext);
