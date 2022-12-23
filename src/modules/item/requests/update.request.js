const { body } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const ItemQuery = require('../item.query.js');

module.exports = [
  body('name')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isString()
    .withMessage('validation.string')
    .bail()
    .custom(async (val, { req }) => {
      if (!isValidObjectId(req.params.id))
        throw new Error('validation.invalid');

      const exists = await new ItemQuery()
        .where('name', val)
        .whereObjectId('_id', req.params.id, { operator: '$ne' })
        .exists();

      if (exists) {
        throw new Error('validation.already-exists');
      }

      return true;
    }),
];
