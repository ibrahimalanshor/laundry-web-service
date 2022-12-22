const { body } = require('express-validator');

module.exports = [
  body('refreshToken')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isJWT()
    .withMessage('validation.jwt')
    .bail(),
];
