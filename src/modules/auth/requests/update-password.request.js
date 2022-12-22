const { body } = require('express-validator');

module.exports = [
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
  body('password_confirmation')
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
    .bail()
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error('validation.confirmed');
      }

      return true;
    }),
];
