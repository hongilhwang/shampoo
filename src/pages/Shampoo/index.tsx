import React from 'react';
import Indices from 'components/Indices';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Server from 'components/Server';
import { Frame, Header } from 'components/Frame';
import stringToServer from 'utils/stringToServer';
import { actions as shampooActions } from './slice/shampoo';

const Shampoo = ({ children }) => {
  const connected = useSelector(state => state.shampoo.connected);
  const server = useSelector(state => state.shampoo.server);
  const indices = useSelector(state => state.shampoo.indices);
  const dispatch = useDispatch();
  const loadServer = React.useCallback(payload => dispatch(shampooActions.loadServer(payload)), [
    dispatch
  ]);
  const setIndex = React.useCallback(payload => dispatch(shampooActions.setIndex(payload)), [
    dispatch
  ]);

  const handleChangeServer = React.useCallback(
    url => {
      loadServer(stringToServer(url));
    },
    [loadServer]
  );

  const handleConnect = React.useCallback(
    url => {
      loadServer(stringToServer(url));
    },
    [server]
  );

  const handleChange = React.useCallback(index => {
    setIndex(index);
  }, []);

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
      {children}
    </Frame>
  );
};

Shampoo.propTypes = {
  children: PropTypes.element
};
Shampoo.defaultProps = {
  children: undefined
};

export default Shampoo;
