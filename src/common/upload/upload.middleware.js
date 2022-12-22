const { BadRequestException } = require('../exceptions');

module.exports = function (multer) {
  const validator = (req, res, next) => {
    if (!req.file) {
      throw new BadRequestException({}, 'auth.photo-required');
    }

    next();
  };

  return [multer, validator];
};
