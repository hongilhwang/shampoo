import React from 'react';
import { Frame,  Header } from 'components/Frame'
import Server from 'components/Server';
import JsonView, {JsonViewProvider} from 'components/JsonView';
import { ServerProvider } from 'components/Server';

const App = () => {
  return (
    <ServerProvider>
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
    </ServerProvider>
  );
};

export default App;
