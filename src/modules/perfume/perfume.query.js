const { Query } = require('../../common/query');
const PerfumeModel = require('./model/perfume.model');

function PerfumeQuery() {
  Query.call(this, PerfumeModel);
}

PerfumeQuery.prototype = Object.create(Query.prototype, {
  constructor: {
    value: PerfumeQuery.constructor,
  },
});

module.exports = PerfumeQuery;
