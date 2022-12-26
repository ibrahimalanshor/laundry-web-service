const { body } = require('express-validator');
const UserQuery = require('../../user/user.query.js');
const OrderQuery = require('../../order/order.query.js');

module.exports = [
  body('content')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isString()
    .withMessage('validation.string')
    .bail(),
  body('userId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isMongoId()
    .withMessage('validation.mongoid')
    .bail()
    .custom(async (val, { req }) => {
      if (req.user._id.toString() !== val) {
        throw new Error('validation.not-exists');
      }

      const exists = await new UserQuery().whereObjectId('_id', val).exists();

      if (!exists) {
        throw new Error('validation.not-exists');
      }

      return true;
    }),
];
