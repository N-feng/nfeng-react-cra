const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/admin', {
      target: 'http://localhost:3001',
      changeOrigin: true,
    }),
    createProxyMiddleware('/api', {
      target: 'http://localhost:3002',
      changeOrigin: true,
    }),
  );
};