const config = require('../../../../config');

exports.photoSrc = function () {
  return this.photo
    ? `${config.app.url}/uploads/perfume/photos/${this.photo}`
    : null;
};
