import { useContext } from 'react';
import UrlContext, { ContextType } from 'components/Server/context/UrlContext';

const useBaseURL = (): ContextType => useContext(UrlContext);

export default useBaseURL;
