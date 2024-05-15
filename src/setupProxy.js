const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api-admin', {
      target: 'http://localhost:3001',
      changeOrigin: true,
    }),
    createProxyMiddleware('/api-server', {
      target: 'http://localhost:3002',
      changeOrigin: true,
    }),
  );
};