import React from 'react';
import Indices from 'components/Indices';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import Server from 'components/Server';
import axios from 'axios';
import apis from 'apis';
import { Frame, Header } from 'components/Frame';
import DataViewer from 'pages/DataViewer';
import actions from 'actions';
import stringToServer from 'utils/stringToServer';

const Shampoo = () => {
  const [connected, setConnected] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const server = useSelector(state => state.server);
  const indices = useSelector(state => state.indices);
  const dispatch = useDispatch();
  const loadRoot = React.useCallback(() => dispatch(actions.meta.loadRoot.onRequest()), [dispatch]);
  const setServer = React.useCallback(payload => dispatch(actions.server.setServer(payload)), [
    dispatch
  ]);
  const setDataView = React.useCallback(
    payload => {
      dispatch(actions.dataView.setDataView(payload));
    },
    [dispatch]
  );

  const showError = React.useCallback(
    e => {
      const options = { variant: 'error' };
      enqueueSnackbar(e.message, options);
      console.error(e);
    },
    [enqueueSnackbar]
  );

  const handleChangeServer = React.useCallback(
    url => {
      setServer(stringToServer(url));
    },
    [setServer]
  );

  const handleConnect = React.useCallback(async () => {
    loadRoot();
    setConnected(true);
  }, [server, setConnected]);

  const handleChange = React.useCallback(
    async index => {
      try {
        if (index) {
          const response = await apis.getData(index.index);
          setDataView(response.data);
          if (response && response.data && response.data.hits) {
            setDataView(response.data.hits);
          }
        }
      } catch (e) {
        showError(e);
      }
    },
    [showError, setDataView]
  );

  return (
    <Frame
      leftHeader={
        <Header logo="Shampoo">
          <Server
            onConnect={handleConnect}
            server={server}
            onChange={handleChangeServer}
            connected={connected}
          />
        </Header>
      }
      rightHeader={<Indices onChange={handleChange} indices={indices} />}
    >
      <DataViewer />
    </Frame>
  );
};
export default Shampoo;
