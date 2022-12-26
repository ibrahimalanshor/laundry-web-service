const config = require('../../../../config');

exports.photoSrc = function () {
  return this.photo
    ? `${config.app.url}/uploads/packet/photos/${this.photo}`
    : null;
};
