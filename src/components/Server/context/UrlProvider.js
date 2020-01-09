import React from 'react';
import UrlContext from './UrlContext';
import defaultContextValue from './DefaultContextValue';
import axios from "axios";

const UrlProvider = ({children}) => {

  const [state, setState] = React.useState(defaultContextValue);

  React.useEffect(()=>{
    axios.defaults.baseURL = `${defaultContextValue.protocol}://${defaultContextValue.baseURL}:${defaultContextValue.port}`;
  },[]);

  const setter = React.useCallback((domain)=>{
    if( domain && domain.trim() ){
      const url = { protocol : 'http', baseURL : 'localhost', port: 9002 };
      const urlItems = domain.trim().split(':');

      if( urlItems[0] === 'http' || urlItems[0] === 'https' ){
        //첫 번째 값이 프로토콜로 구성됨
        url.protocol = urlItems[0];
        url.baseURL = urlItems[1].replace(/[(:\/\/)]/g, '').replace('/','');

        if(urlItems.length === 3 ){
          const port = urlItems[2].replace(/[^0-9]/g,'');
          if(port){
            url.port = parseInt(port);
          }else{
            url.port = 9002;
          }
        }
      }else{
        url.protocol = 'http';
        url.baseURL = urlItems[0].replace(/[(:\/\/)]/g,'').replace('/','');
        if(urlItems.length === 2 ){
          const port = urlItems[1].replace(/[^0-9]/g,'');
          if(port){
            url.port = parseInt(port);
          }else{
            url.port = 9002;
          }
        }
      }
      axios.defaults.baseURL = `${url.protocol}://${url.baseURL}:${url.port}`;
      setState(url);
    }
  },[]);

  React.useEffect(()=>{
  },[state]);

  return (
    <UrlContext.Provider value={[state, setter]}>
      {children}
    </UrlContext.Provider>
  );
};

export default UrlProvider;
