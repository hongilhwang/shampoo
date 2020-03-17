import React from 'react';
import ReactJson from 'react-json-view';

interface JsonViewProps {
  data: object;
}

const JsonView: React.FunctionComponent<JsonViewProps> = ({ data = {} }: JsonViewProps) => {
  return <ReactJson src={data} />;
};

export default JsonView;
