const { body } = require('express-validator');

module.exports = [
  body('status')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isString()
    .withMessage('validation.string')
    .bail()
    .isIn(['processed', 'finished', 'taken'])
    .withMessage('validation.invalid')
    .bail(),
];
