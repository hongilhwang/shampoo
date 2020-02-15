import React from 'react';
import ReactJson from 'react-json-view';
import JsonViewContext from '../context/JsonViewContext';

const JsonView = () => (
  <JsonViewContext.Consumer>{([state]) => <ReactJson src={state} />}</JsonViewContext.Consumer>
);

export default JsonView;
