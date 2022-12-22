const { body } = require('express-validator');

module.exports = [
  body('type')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isString()
    .withMessage('validation.string')
    .bail()
    .isIn(['increment', 'decrement'])
    .withMessage('validation.invalid')
    .bail(),
  body('stock')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .isInt({ min: 1 })
    .withMessage('validation.integer')
    .bail(),
];
