import React from 'react';

type StateType = undefined | string | number | object | object[] | string[] | number[];

const defaultState: StateType = undefined;

export type SetterType = (state: StateType) => void;

const defaultSetter: SetterType = () => {};

export type ContextType = [StateType, SetterType];

export const defaultContextValue: ContextType = [defaultState, defaultSetter];

export default React.createContext(defaultContextValue);
