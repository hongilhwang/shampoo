import { useContext } from 'react';
import UrlContext from '../context/UrlContext'

const useBaseURL = () => useContext(UrlContext);

export default useBaseURL;
