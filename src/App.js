import React from 'react';
import { Frame,  Header } from 'components/Frame'
import Server from 'components/Server';
import JsonView, {JsonViewProvider} from 'components/JsonView';

const App = () => {
  return (
    <JsonViewProvider>
      <Frame
        header={(
          <Header logo={'Sauron'} >
            <Server />
          </Header>
        )}
      >
        <JsonView />
      </Frame>
    </JsonViewProvider>
  );
};

export default App;
