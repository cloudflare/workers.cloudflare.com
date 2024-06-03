/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  serverBuildTarget: 'cloudflare-pages',
  server: './server.js',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
};
