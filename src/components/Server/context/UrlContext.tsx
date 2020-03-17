import React from 'react';

export type ProtocolType = 'http' | 'https';

export type ServerType = {
  protocol: ProtocolType;
  baseURL: string;
  port: number;
};

export const defaultServerValue: ServerType = {
  protocol: (process.env.REACT_APP_DEFAULT_PROTOCOL || 'http') as ProtocolType,
  baseURL: process.env.REACT_APP_DEFAULT_URL || 'localhost',
  port: parseInt(process.env.REACT_APP_DEFAULT_PORT || '9200', 10)
};

type SetterType = (url: string) => void;

const defaultSetter: SetterType = () => {};

export type ContextType = [ServerType, SetterType];

const defaultContext: ContextType = [defaultServerValue, defaultSetter];

export default React.createContext(defaultContext);
