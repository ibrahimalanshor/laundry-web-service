const HttpException = require('./http.exception');

function ConflictException(errors) {
  HttpException.call(this, 409, errors);
}

ConflictException.prototype = Object.create(HttpException.prototype, {
  constructor: {
    value: ConflictException,
  },
});

module.exports = ConflictException;
