const Controller = require('./controller');
const Middleware = require('./middleware');
const Auth = require('adapt-authoring-auth');
/** @ignore */
const routes = [
  {
    route: '/:id?',
    handlers: {
      post: [Middleware.beforePost, Controller.postUser, Middleware.afterPost],
      get: [Middleware.memoiseQuery, Controller.getUsers],
      put: [Middleware.memoiseQuery, Controller.putUser],
      delete: [Auth.authenticate, Middleware.memoiseQuery, Controller.deleteUser]
    }
  }
];

module.exports = routes;
