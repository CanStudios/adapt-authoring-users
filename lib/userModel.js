const bcrypt = require('bcrypt-nodejs');
/**
 * User model
 */
class UserModel {
    /**
     * Hashes a password
     * @param {password} plaintext password for hashing
     * @param {next} callback function
     */
    hashPassword(password, next) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, null, next);
        });
    }
}

module.exports = UserModel;
