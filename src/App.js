import React from 'react';
import { Frame,  Header } from 'components/Frame'
import Server from 'components/Server';
import JsonView, {JsonViewProvider} from 'components/JsonView';
import { ServerProvider } from 'components/Server';
import Indices, {IndicesProvider} from "components/Indices";

const App = () => {
  return (
    <ServerProvider>
      <IndicesProvider>
        <JsonViewProvider>
          <Frame
            leftHeader={(
              <Header logo={'Sauron'} >
                <Server />
              </Header>
            )}
            rightHeader={(
              <Indices/>
            )}
          >
            <JsonView />
          </Frame>
        </JsonViewProvider>
      </IndicesProvider>
    </ServerProvider>
  );
};

export default App;
