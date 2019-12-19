import React from 'react';
import JsonViewContext from '../context/JsonViewContext';
import ReactJson from 'react-json-view';

const JsonView = () => (
  <JsonViewContext.Consumer>
    {
      context => <ReactJson src={context.state} />
    }
  </JsonViewContext.Consumer>
);


export default JsonView;
