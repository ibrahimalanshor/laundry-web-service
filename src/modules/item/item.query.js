const { Query } = require('../../common/query');
const ItemModel = require('./model/item.model');

function ItemQuery() {
  Query.call(this, ItemModel);
}

ItemQuery.prototype = Object.create(Query.prototype, {
  constructor: {
    value: ItemQuery.constructor,
  },
});

module.exports = ItemQuery;
