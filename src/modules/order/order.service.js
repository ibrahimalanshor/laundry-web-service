const OrderModel = require('./model/order.model.js');
const OrderQuery = require('./order.query.js');
const PacketQuery = require('../packet/packet.query.js');
const {
  getLatestInvoice,
  countEstimatedFinishAt,
  countTotalPrice,
} = require('./order.helper.js');

exports.get = async function (query) {
  const count = await new OrderQuery().search('invoice', query.invoice).count();
  const rows = await new OrderQuery()
    .search('invoice', query.invoice)
    .sort(query.sort)
    .paginate({ page: query.page, limit: query.limit });

  return { count, rows };
};

exports.create = async function (body) {
  const packet = await new PacketQuery()
    .whereObjectId('_id', body.packetId)
    .find();

  const invoice = await getLatestInvoice();
  const estimatedFinishAt = await countEstimatedFinishAt(packet);
  const totalPrice = await countTotalPrice(packet, body.details);

  return await OrderModel.create({
    invoice,
    estimatedFinishAt,
    totalPrice,
    ...body,
  });
};

exports.find = async function (id) {
  return await new OrderQuery().findByIdOrFail(id);
};

exports.update = async function (id, body) {
  const order = await new OrderQuery().findByIdOrFail(id);

  await OrderModel.updateOne(order, body);

  return order;
};

exports.delete = async function (id) {
  const order = await new OrderQuery().findByIdOrFail(id);

  await OrderModel.deleteOne(order);

  return order;
};
