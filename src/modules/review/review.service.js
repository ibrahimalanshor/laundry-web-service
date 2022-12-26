const ReviewModel = require('./model/review.model.js');
const ReviewQuery = require('./review.query.js');

exports.get = async function (query) {
  const count = await new ReviewQuery().where('userId', query.userId).count();
  const rows = await new ReviewQuery()
    .where('userId', query.userId)
    .sort(query.sort)
    .paginate({ page: query.page, limit: query.limit });

  return { count, rows };
};

exports.create = async function (body) {
  return await ReviewModel.create(body);
};

exports.find = async function (id) {
  return await new ReviewQuery().findByIdOrFail(id);
};

exports.delete = async function (id) {
  const review = await new ReviewQuery().findByIdOrFail(id);

  await ReviewModel.deleteOne(review);

  return review;
};
