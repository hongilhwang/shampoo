import { useContext } from 'react';
import JsonViewContext from 'components/JsonView/context/JsonViewContext';

const useJsonView = () => useContext(JsonViewContext);

export default useJsonView;
