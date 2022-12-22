const { Schema } = require('mongoose');
const virtuals = require('./refresh-token.virtual');

const RefreshTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    token: String,
    expireAt: {
      type: Date,
      default: Date.now,
      expires: 86400 * 30,
    },
  },
  {
    timestamps: true,
  }
);

for (const name in virtuals) {
  RefreshTokenSchema.virtual(name, virtuals[name]);
}

module.exports = RefreshTokenSchema;
