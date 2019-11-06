const AbstractApiModule = require('adapt-authoring-api');
const { Utils } = require('adapt-authoring-core');
/**
* Abstract module which handles users
* @extends {AbstractApiModule}
*/
class AbstractUserApiModule extends AbstractApiModule {
  /** @override */
  static get def() {
    return {
      name: 'user',
      routes: [
        {
          route: '/:_id?',
          handlers: [ 'get', 'post', 'put', 'delete' ]
        }
      ]
    };
  }
  /** @override */
  preload(app, resolve, reject) {
    logger.log('error', 'preload abstractUserApiModule.js');
    logger.log('error', 'user data is:')
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
