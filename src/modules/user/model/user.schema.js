const { Schema } = require('mongoose');
const methods = require('./user.method.js');
const virtuals = require('./user.virtual');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    name: String,
    photo: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

for (const name in methods) {
  UserSchema.methods[name] = methods[name];
}

for (const name in virtuals) {
  UserSchema.virtual(name).get(virtuals[name]);
}

module.exports = UserSchema;
