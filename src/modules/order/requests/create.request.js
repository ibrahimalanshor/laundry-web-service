const { body } = require('express-validator');
const PacketQuery = require('../../packet/packet.query.js');
const PerfumeQuery = require('../../perfume/perfume.query.js');
const ItemQuery = require('../../item/item.query.js');
const UserQuery = require('../../user/user.query.js');

module.exports = [
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
      if (req.user !== 'admin' && req.user._id.toString() !== val) {
        throw new Error('validation.not-exists');
      }

      const exists = await new UserQuery().whereObjectId('_id', val).exists();

      if (!exists) {
        throw new Error('validation.not-exists');
      }

      return true;
    }),
  body('packetId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isMongoId()
    .withMessage('validation.mongoid')
    .bail()
    .custom(async (val) => {
      const exists = await new PacketQuery().whereObjectId('_id', val).exists();

      if (!exists) {
        throw new Error('validation.not-exists');
      }

      return true;
    }),
  body('perfumeId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isMongoId()
    .withMessage('validation.mongoid')
    .bail()
    .custom(async (val) => {
      const exists = await new PerfumeQuery()
        .whereObjectId('_id', val)
        .where('stock', 0, { operator: '$gt' })
        .exists();

      if (!exists) {
        throw new Error('validation.not-exists');
      }

      return true;
    }),
  body('details')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isArray({ min: 1 })
    .withMessage('validation.array')
    .bail(),
  body('details.*.qty')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isInt()
    .withMessage('validation.integer')
    .bail(),
  body('details.*.itemId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .notEmpty()
    .withMessage('validation.not-empty')
    .bail()
    .isMongoId()
    .withMessage('validation.mongoid')
    .bail()
    .custom(async (val) => {
      const exists = await new ItemQuery().whereObjectId('_id', val).exists();

      if (!exists) {
        throw new Error('validation.not-exists');
      }

      return true;
    }),
];
