const { model } = require('mongoose');
const OrderSchema = require('./order.schema');

module.exports = model('order', OrderSchema);
