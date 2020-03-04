import { useContext } from 'react';
import IndicesContext from 'components/Indices/context/IndicesContext'

const useIndices = () => useContext(IndicesContext);

export default useIndices;
