const config = require('../../../config');
const jwt = require('jsonwebtoken');
const { AuthenticationException } = require('../exceptions');

exports.generate = async function generate(payload, options = {}) {
  return await jwt.sign(payload, config.app.key, {
    expiresIn: options.expiresIn || '15m',
  });
};

exports.verify = async function (token) {
  try {
    return await jwt.verify(token, config.app.key);
  } catch (err) {
    if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.TokenExpiredError
    ) {
      throw new AuthenticationException({}, 'auth.token-invalid');
    }
  }
};
