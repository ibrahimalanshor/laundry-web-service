const { string } = require('../../common/helpers');
const PacketModel = require('./model/packet.model.js');
const PacketQuery = require('./packet.query.js');

exports.get = async function (query) {
  const count = await new PacketQuery()
    .search('name', query.name)
    .where('type', query.type)
    .count();
  const rows = await new PacketQuery()
    .search('name', query.name)
    .where('type', query.type)
    .sort(query.sort)
    .paginate({ page: query.page, limit: query.limit });

  return { count, rows };
};

exports.create = async function (body) {
  return await PacketModel.create(body);
};

exports.find = async function (id) {
  return await new PacketQuery().findByIdOrFail(id);
};

exports.update = async function (id, body) {
  const packet = await new PacketQuery().findByIdOrFail(id);

  await PacketModel.updateOne(packet, body);

  return packet;
};

exports.delete = async function (id) {
  const packet = await new PacketQuery().findByIdOrFail(id);

  await PacketModel.deleteOne(packet);

  return packet;
};
