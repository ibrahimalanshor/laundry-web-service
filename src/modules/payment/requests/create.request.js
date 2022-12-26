const { body } = require('express-validator');
const UserQuery = require('../../user/user.query.js');
const OrderQuery = require('../../order/order.query.js');

module.exports = [
  body('amount')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .isInt({ min: 1 })
    .withMessage('validation.integer')
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
      if (req.user.role !== 'admin' && req.user._id.toString() !== val) {
        throw new Error('validation.not-exists');
      }

      const exists = await new UserQuery().whereObjectId('_id', val).exists();

      if (!exists) {
        throw new Error('validation.not-exists');
      }

      return true;
    }),
  body('orderId')
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
      const exists = await new OrderQuery()
        .whereObjectId('_id', val)
        .where('isPaid', false)
        .if(req.user.role !== 'admin', (query) => {
          query.whereObjectId('userId', req.user._id);
        })
        .exists();

      if (!exists) {
        throw new Error('validation.not-exists');
      }

      return true;
    }),
];
