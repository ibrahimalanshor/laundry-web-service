const { body } = require('express-validator');
const PerfumeQuery = require('../perfume.query.js');

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
      const exists = await new PerfumeQuery().where('name', val).exists();

      if (exists) {
        throw new Error('validation.already-exists');
      }

      return true;
    }),
  body('price')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .isInt({ min: 1 })
    .withMessage('validation.integer')
    .bail(),
];
