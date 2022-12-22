const { ForbiddenException } = require('../../common/exceptions');

module.exports = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) throw new ForbiddenException({});

    next();
  };
};
