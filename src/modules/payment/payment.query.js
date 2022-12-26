const { Query } = require('../../common/query');
const PaymentModel = require('./model/payment.model');

function PaymentQuery() {
  Query.call(this, PaymentModel);
}

PaymentQuery.prototype = Object.create(Query.prototype, {
  constructor: {
    value: PaymentQuery.constructor,
  },
});

module.exports = PaymentQuery;
