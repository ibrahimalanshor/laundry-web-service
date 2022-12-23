const { body } = require('express-validator');
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
    .custom(async (val) => {
      const exists = await new ItemQuery().where('name', val).exists();

      if (exists) {
        throw new Error('validation.already-exists');
      }

      return true;
    }),
];
