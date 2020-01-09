import React from 'react';
import { Frame,  Header } from 'components/Frame'
import Server from 'components/Server';
import {JsonViewProvider, useJsonView} from 'components/JsonView';
import { ServerProvider } from 'components/Server';
import Indices, {IndicesProvider, useIndices} from "components/Indices";
import { SnackbarProvider, useSnackbar } from 'notistack';
import apis from 'apis';
import useBaseURL from "components/Server/hooks/useBaseURL";
import axios from 'axios';
import DataViewer from 'pages/DataViewer';

function App(){

  const [, setJsonViewSource] = useJsonView();
  const [, setIndices] = useIndices();
  const { enqueueSnackbar } = useSnackbar();
  const [server] = useBaseURL();

  React.useEffect(()=>{
    axios.baseURI = `${server.protocol}://${server.baseURL}:${server.port}`;
  },[]);

  const handleConnect = React.useCallback(async(setter)=>{
    if( axios.baseURI ){
      try{
        const response = await apis.getRoot();
        setJsonViewSource(response);
        setter(true);
        try{
          const indicesResponse = await apis.getIndices();
          setIndices(indicesResponse.data);
        }catch(e){
          console.error(e);
          enqueueSnackbar(e.message, { variant: 'error' });
        }
      }catch(e){
        setter(false);
        console.error(e);
        enqueueSnackbar(e.message, { variant: 'error' });
      }
    }
  },[axios, setJsonViewSource, setIndices]);

  const handleChange = React.useCallback(async (index)=>{
    try{
      if( index ){
        const response = await apis.getData(index.index);
        setJsonViewSource(response);
      }
    }catch(e){
      console.error(e);
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  },[]);

  return (
    <Frame
      leftHeader={(
        <Header logo={'Neutrino'} >
          <Server onConnect={handleConnect} />
        </Header>
      )}
      rightHeader={(
        <Indices onChange={handleChange}/>
      )}
    >
      <DataViewer />
    </Frame>
  )

}

const Provider = () => {


  return (
    <SnackbarProvider maxSnack={3}>
      <ServerProvider>
        <IndicesProvider>
          <JsonViewProvider>
            <App />
          </JsonViewProvider>
        </IndicesProvider>
      </ServerProvider>
    </SnackbarProvider>
  );
};

export default Provider;
