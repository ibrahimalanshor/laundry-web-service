const config = require('../../../../config');

exports.photoSrc = function () {
  return this.photo
    ? `${config.app.url}/uploads/user/photos/${this.photo}`
    : null;
};
