import React from 'react';
import JsonViewContext from '../context/JsonViewContext';
import ReactJson from 'react-json-view';

const JsonView = () => (
  <JsonViewContext.Consumer>
    {
      ([state]) => (<ReactJson src={state} />)
    }
  </JsonViewContext.Consumer>
);


export default JsonView;
