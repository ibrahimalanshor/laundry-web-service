const { ForbiddenException } = require('../../../common/exceptions');

exports.canAccessOrder = function (order) {
  if (this._id.toString() !== order.userId.toString())
    throw new ForbiddenException();
};
