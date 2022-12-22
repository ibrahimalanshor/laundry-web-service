const { Query } = require('../../common/query');
const PacketModel = require('./model/packet.model');

function PacketQuery() {
  Query.call(this, PacketModel);
}

PacketQuery.prototype = Object.create(Query.prototype, {
  constructor: {
    value: PacketQuery.constructor,
  },
});

module.exports = PacketQuery;
