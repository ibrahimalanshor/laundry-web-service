const { body } = require('express-validator');

module.exports = [
  body('email')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isEmail()
    .withMessage('validation.email')
    .bail(),
  body('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isString()
    .withMessage('validation.string')
    .bail()
    .isLength({ min: 8 })
    .withMessage('validation.length')
    .bail(),
];
