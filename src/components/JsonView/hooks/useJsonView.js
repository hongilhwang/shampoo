import { useContext } from 'react';
import JsonViewContext from '../context/JsonViewContext'

const useJsonView = () => useContext(JsonViewContext);

export default useJsonView;
