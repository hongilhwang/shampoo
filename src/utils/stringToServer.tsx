export default domain => {
  const url = {
    protocol: undefined,
    baseURL: undefined,
    port: undefined
  };

  if (domain && domain.trim()) {
    let domainString = domain.trim();

    if (domain.indexOf('http') !== 0) {
      domainString = `http://${domainString}`;
    }

    const [protocol, baseURL, port = 9002] = domainString.split(':');

    url.protocol = protocol;
    url.baseURL = baseURL.replace(/[(://)]/g, '').replace('/', '');
    url.port = parseInt(port.replace(/[^0-9]/g, ''), 10);
  }

  return url;
};
