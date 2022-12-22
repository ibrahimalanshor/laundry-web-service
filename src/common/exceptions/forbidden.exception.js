const HttpException = require('./http.exception');

function ForbiddenException(errors) {
  HttpException.call(this, 403, errors);
}

ForbiddenException.prototype = Object.create(HttpException.prototype, {
  constructor: {
    value: ForbiddenException,
  },
});

module.exports = ForbiddenException;
