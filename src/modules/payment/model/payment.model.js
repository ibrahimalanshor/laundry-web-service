const { model } = require('mongoose');
const PaymentSchema = require('./payment.schema');

module.exports = model('payment', PaymentSchema);
