const Logger = require('adapt-authoring-logger');
const { DataStoreQuery, Responder } = require('adapt-authoring-core');
const UserModel = require('./userModel');
/**
* Middleware for the users module
*/
class Middleware {
  /**
  * Format the standard input for use later
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  * @todo this is probably something that could/should be a generic API-level middleware
  */
  static memoiseQuery(req, res, next) {
    try {
      req.dsquery = new DataStoreQuery(req.query || {});
      if(req.params.id) req.dsquery._id = req.params.id;
      next();
    } catch(e) {
      next(e);
    }
  }
  /**
  * Called before creating a new user
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  static beforePost(req, res, next) {
    log('info', `Middleware called before user.post`);
    log('info', req);
    new UserModel().hashPassword(req.body.password, function(error, hash) {
      if (error) {
        const e = new Error(`${Errors.HashFail}, ${Errors.BadInput}`);
        e.statusCode = Responder.StatusCodes.Error.User;
        return next(e);
      }
      req.body.password = hash;
      next();
    });
  }
  /**
  * Called after creating a new user
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  static afterPost(req, res, next) {
    log('info', `Middleware called after user.post`);
    next();
  }
};
/** @ignore */
function log(level, ...rest) {
  Logger.log(level, 'users-middleware', ...rest);
}

module.exports = Middleware;
