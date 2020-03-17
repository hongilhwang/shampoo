import React from 'react';
import defaultContextValue, { indicesType } from 'components/Indices/context/DefaultContextValue';

type setterType = (indices: indicesType) => void;
const defaultSetter: setterType = (): void => {
  // setter
};

export type indicesContextType = [indicesType, setterType];

const defaultContext: indicesContextType = [defaultContextValue, defaultSetter];

export default React.createContext(defaultContext);
