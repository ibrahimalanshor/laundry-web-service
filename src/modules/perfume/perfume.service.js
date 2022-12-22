const { string } = require('../../common/helpers');
const PerfumeModel = require('./model/perfume.model.js');
const PerfumeQuery = require('./perfume.query.js');

exports.get = async function (query) {
  const count = await new PerfumeQuery().search('name', query.name).count();
  const rows = await new PerfumeQuery()
    .search('name', query.name)
    .sort(query.sort)
    .paginate({ page: query.page, limit: query.limit });

  return { count, rows };
};

exports.create = async function (body) {
  return await PerfumeModel.create(body);
};

exports.find = async function (id) {
  return await new PerfumeQuery().findByIdOrFail(id);
};

exports.update = async function (id, body) {
  const perfume = await new PerfumeQuery().findByIdOrFail(id);

  await PerfumeModel.updateOne(perfume, body);

  return perfume;
};

exports.delete = async function (id) {
  const perfume = await new PerfumeQuery().findByIdOrFail(id);

  await PerfumeModel.deleteOne(perfume);

  return perfume;
};
