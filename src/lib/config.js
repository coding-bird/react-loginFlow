module.exports = {
  SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
  backend: {
    hapiRemote: true,
    hapiLocal: false
  },
  HAPI: {
    local: {
      url: 'http://localhost:5000'
    },
    remote: {
      url: 'https://snowflakeserver-bartonhammond.rhcloud.com/'
    }
  }
}
