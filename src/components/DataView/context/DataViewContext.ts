import React from 'react';

type stateType = undefined | string | number | object | object[] | string[] | number[];

const defaultState: stateType = undefined;

type setterType = (state: stateType) => void;

const defaultSetter: setterType = () => {
  // setter
};

export type contextType = [stateType, setterType];

const defaultContext: contextType = [defaultState, defaultSetter];

export default React.createContext(defaultContext);
