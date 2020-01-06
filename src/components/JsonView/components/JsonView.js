import React from 'react';
import JsonViewContext from '../context/JsonViewContext';
import ReactJson from 'react-json-view';

const JsonView = () => (
  <JsonViewContext.Consumer>
    {
      context => <ReactJson src={context[0]} />
    }
  </JsonViewContext.Consumer>
);


export default JsonView;
