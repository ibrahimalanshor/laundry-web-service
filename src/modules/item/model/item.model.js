const { model } = require('mongoose');
const ItemSchema = require('./item.schema');

module.exports = model('item', ItemSchema);
