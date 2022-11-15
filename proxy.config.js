const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: "http://localhost:3000/",
    logLevel: 'debug',
    secure: false,
    pathRewrite: {'^/api': ''}
  }
]

module.exports = PROXY_CONFIG;
