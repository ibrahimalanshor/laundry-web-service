function HttpException(status = 400, errors = {}, message = null) {
  this.status = status;
  this.message = message;
  this.errors = errors;
}

module.exports = HttpException;
