const { model } = require('mongoose');
const RefreshToken = require('./refresh-token.schema.js');

module.exports = model('refres-token', RefreshToken);
