const HttpException = require('./http.exception');

function BadRequestException(errors, msg) {
  HttpException.call(this, 400, errors, msg);
}

BadRequestException.prototype = Object.create(HttpException.prototype, {
  constructor: {
    value: BadRequestException,
  },
});

module.exports = BadRequestException;
