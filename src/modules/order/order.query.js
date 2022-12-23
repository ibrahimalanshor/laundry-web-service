const { Query } = require('../../common/query');
const OrderModel = require('./model/order.model');

function OrderQuery() {
  Query.call(this, OrderModel);
}

OrderQuery.prototype = Object.create(Query.prototype, {
  constructor: {
    value: OrderQuery.constructor,
  },
});

module.exports = OrderQuery;
