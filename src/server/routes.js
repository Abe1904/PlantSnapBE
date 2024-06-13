const { registerHandler, loginHandler, profileHandler } = require('./handler');
const { predictHandler } = require('../services/predictHandler');

const routes = [
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler
  },
  {
    method: 'GET',
    path: '/secure/profile',
    handler: profileHandler,
  },
  {
    method: 'POST',
    path: '/predict',
    handler: predictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream', // process file as stream
        parse: true
      }
    }
  }
];

module.exports = routes;
