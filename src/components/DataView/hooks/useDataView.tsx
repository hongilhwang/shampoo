import { useContext } from 'react';
import DataViewContext from '../context/DataViewContext'

const useDataView = () => useContext(DataViewContext);

export default useDataView;
