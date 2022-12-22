const HttpException = require('./http.exception');

function NotFoundException(errors) {
  HttpException.call(this, 404, errors);
}

NotFoundException.prototype = Object.create(HttpException.prototype, {
  constructor: {
    value: NotFoundException,
  },
});

module.exports = NotFoundException;
