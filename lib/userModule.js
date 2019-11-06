const { AbstractModule, Responder, Utils } = require('adapt-authoring-core');
/**
* Module which handles users
* @extends {AbstractModule}
*/
class UserModule extends AbstractModule {
  /** @override */
  preload(app, resolve, reject) {
    Utils.defineGetter(this, 'router', app.getModule('server').api.createChildRouter('user'));
    app.auth.secureRoute(`${this.router.path}/`, 'GET', [ 'read:user' ]);
    this.router.enableAPIMap();
    resolve();
  }
}

module.exports = UserModule;
