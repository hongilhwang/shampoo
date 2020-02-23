import { createActions } from 'redux-actions';

const options = {
  prefix: 'indices'
};

const actions = createActions(
  {
    loadIndices: {
      onRequest: () => ({}),
      onFailure: error => ({ error }),
      onSuccess: (response, callback) => ({ response, callback })
    }
  },
  options
);

export default actions;
