const AbstractApiModule = require('adapt-authoring-api');
const { Utils } = require('adapt-authoring-core');
const UserSchema = require('../schema/user.schema.js');
/**
* Abstract module which handles users
* @extends {AbstractApiModule}
*/
class AbstractUserApiModule extends AbstractApiModule {
  /** @override */
  static get def() {
    return {
      name: 'users',
      model: 'user',
      schemas: [ UserSchema ],
      routes: [
        {
          route: '/:_id?',
          handlers: ['post','get','put','delete']
        }
      ]
    };
  }
  /** @override */
  preload(app, resolve, reject) {
    const user = this.app.getModule('users');
    user.on('preload', () => {
      /**
      * Router instance
      * @type {Router}
      */
      Utils.defineGetter(this, 'router', user.router.createChildRouter(this.constructor.def.name));
      this.initMiddleware();
      this.initRoutes();
      resolve();
    });
  }
}

module.exports = AbstractUserApiModule;
