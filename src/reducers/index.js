import { combineReducers } from 'redux';
import shampoo from 'pages/Shampoo/slice/shampoo';
import data from 'pages/DataViewer/slice/dataViewer';

export default combineReducers({
  shampoo,
  data
});
