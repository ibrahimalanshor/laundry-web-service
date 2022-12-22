const { model } = require('mongoose');
const UserSchema = require('./user.schema.js');

module.exports = model('user', UserSchema);
