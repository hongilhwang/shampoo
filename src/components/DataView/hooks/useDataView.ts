import { useContext } from 'react';
import DataViewContext, { contextType } from '../context/DataViewContext';

const useDataView = (): contextType => useContext(DataViewContext);

export default useDataView;
