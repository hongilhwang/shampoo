import { useContext } from 'react';
import IndicesContext, { indicesContextType } from 'components/Indices/context/IndicesContext';

const useIndices = (): indicesContextType => useContext(IndicesContext);

export default useIndices;
