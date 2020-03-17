import { useContext } from 'react';
import JsonViewContext, { ContextType } from 'components/JsonView/context/JsonViewContext';

const useJsonView = (): ContextType => useContext(JsonViewContext);

export default useJsonView;
