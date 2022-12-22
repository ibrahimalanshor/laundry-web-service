const HttpException = require('./http.exception');

function AuthenticationException(errors, msg) {
  HttpException.call(this, 401, errors, msg);
}

AuthenticationException.prototype = Object.create(HttpException.prototype, {
  constructor: {
    value: AuthenticationException,
  },
});

module.exports = AuthenticationException;
