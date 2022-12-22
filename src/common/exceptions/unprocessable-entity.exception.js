const HttpException = require('./http.exception');

function UnprocessableEntityException(errors) {
  HttpException.call(this, 422, errors);
}

UnprocessableEntityException.prototype = Object.create(
  HttpException.prototype,
  {
    constructor: {
      value: UnprocessableEntityException,
    },
  }
);

module.exports = UnprocessableEntityException;
