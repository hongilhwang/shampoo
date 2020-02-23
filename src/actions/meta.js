import { createActions } from 'redux-actions';

const options = {
  prefix: 'meta'
};

const actions = createActions(
  {
    loadRoot: {
      onRequest: () => ({}),
      onFailure: error => ({ error }),
      onSuccess: (response, callback) => ({ response, callback })
    }
  },
  options
);

export default actions;
