import { useContext } from 'react';
import UrlContext from 'components/Server/context/UrlContext';

const useBaseURL = () => useContext(UrlContext);

export default useBaseURL;
