import React from 'react';
import { Frame,  Header } from 'components/Frame'
import { Typography } from "@material-ui/core";
import Server from 'components/Server';

const App = () => {
  return (
    <Frame
      header={(
        <Header logo={'Sauron'} >
          <Server />
        </Header>
      )}
    >
      {'contents'}
    </Frame>
  );
};

export default App;
