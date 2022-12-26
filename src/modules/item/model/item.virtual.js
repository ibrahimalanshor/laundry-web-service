const config = require('../../../../config');

exports.photoSrc = function () {
  return this.photo
    ? `${config.app.url}/uploads/item/photos/${this.photo}`
    : null;
};
