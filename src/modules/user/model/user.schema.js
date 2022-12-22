const { Schema } = require('mongoose');

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
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
