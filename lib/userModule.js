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

  /**
   * @param {App} app App instance
   * @param {Function} resolve Function to call on fulfilment
   * @param {Function} reject Function to call on rejection
   */
  boot(app, resolve, reject) {
    const db = app.getModule('mongodb');

    if (db.isConnected) {
      this.initData(db);
      return resolve();
    }
    db.on('boot', () => {
      this.initData(db);
      resolve();
    });
  }

  /**
   * Sets up the DB models
   * @param {MongoDB} db Reference to the database module
   */
  initData(db) {
    //db.addModel('user', UserSchema);
  }
}

module.exports = UserModule;
