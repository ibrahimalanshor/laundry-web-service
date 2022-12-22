const config = require('../../../config');
const path = require('path');
const multer = require('multer');
const { BadRequestException } = require('../exceptions');

module.exports = function createStorage({
  field,
  path: saveDir,
  extension,
  getFilename,
}) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(config.app.uploadDir, saveDir));
    },
    filename: function (req, file, cb) {
      cb(null, getFilename(req, file, cb));
    },
  });

  function fileFilter(req, file, cb) {
    const allowedType = extension;

    if (!allowedType.includes(path.extname(file.originalname))) {
      cb(
        new BadRequestException(
          {},
          { key: 'validation.mime', args: { path: file.fieldname } }
        )
      );
    }

    cb(null, true);
  }

  return multer({ fileFilter, storage }).single(field);
};
