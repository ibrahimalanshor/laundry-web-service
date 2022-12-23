const { string } = require('../../common/helpers');
const ItemModel = require('./model/item.model.js');
const ItemQuery = require('./item.query.js');

exports.get = async function (query) {
  const count = await new ItemQuery().search('name', query.name).count();
  const rows = await new ItemQuery()
    .search('name', query.name)
    .sort(query.sort)
    .paginate({ page: query.page, limit: query.limit });

  return { count, rows };
};

exports.create = async function (body) {
  return await ItemModel.create(body);
};

exports.find = async function (id) {
  return await new ItemQuery().findByIdOrFail(id);
};

exports.update = async function (id, body) {
  const item = await new ItemQuery().findByIdOrFail(id);

  await ItemModel.updateOne(item, body);

  return item;
};

exports.delete = async function (id) {
  const item = await new ItemQuery().findByIdOrFail(id);

  await ItemModel.deleteOne(item);

  return item;
};
