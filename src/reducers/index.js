import { combineReducers } from 'redux';
import server from './server';
import indices from './indices';
import dataView from './dataView';

export default combineReducers({
  server,
  indices,
  dataView
});
