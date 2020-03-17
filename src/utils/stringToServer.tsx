import {
defaultServerValue,  ServerType, ProtocolType
} from 'components/Server/context/UrlContext';

export default (domain: string):ServerType => {
  const url:ServerType = defaultServerValue;

  if (domain && domain.trim()) {
    let domainString = domain.trim();

    if (domain.indexOf('http') !== 0) {
      domainString = `http://${domainString}`;
    }

    const [protocol, baseURL, port] = domainString.split(':');

    url.protocol = protocol as ProtocolType;
    url.baseURL = baseURL.replace(/[(://)]/g, '').replace('/', '');
    url.port = parseInt((port || "9002").replace(/[^0-9]/g, ''), 10);
  }

  return url;
};
