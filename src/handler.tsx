function httpPathHandler(path: string) {
    return fetch("http://AGATE_DOMAIN/" + path, {
      headers: { Authorization: "Token " + "AGATE_TOKEN" },
    });
  }
  
  export default httpPathHandler;
  