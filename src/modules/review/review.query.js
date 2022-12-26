const { Query } = require('../../common/query');
const ReviewModel = require('./model/review.model');

function ReviewQuery() {
  Query.call(this, ReviewModel);
}

ReviewQuery.prototype = Object.create(Query.prototype, {
  constructor: {
    value: ReviewQuery.constructor,
  },
});

module.exports = ReviewQuery;
