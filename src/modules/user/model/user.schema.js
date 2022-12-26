const { Schema } = require('mongoose');
const methods = require('./user.method.js');

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
    photo: String,
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
  }
);

for (const name in methods) {
  UserSchema.methods[name] = methods[name];
}

module.exports = UserSchema;
