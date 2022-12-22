const { Query } = require('../../common/query');
const RefreshTokenModel = require('./model/refresh-token.model');

function RefreshTokenQuery() {
  Query.call(this, RefreshTokenModel);
}

RefreshTokenQuery.prototype = Object.create(Query.prototype, {
  constructor: {
    value: RefreshTokenQuery.constructor,
  },
});

module.exports = RefreshTokenQuery;
