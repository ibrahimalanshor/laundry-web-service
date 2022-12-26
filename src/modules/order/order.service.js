const OrderModel = require('./model/order.model.js');
const OrderQuery = require('./order.query.js');
const PacketQuery = require('../packet/packet.query.js');
const {
  getLatestInvoice,
  countEstimatedFinishAt,
  countTotalPrice,
} = require('./order.helper.js');
const { BadRequestException } = require('../../common/exceptions/index.js');

exports.get = async function (query) {
  const count = await new OrderQuery()
    .search('invoice', query.invoice)
    .where('userId', query.userId)
    .where('isPaid', query.isPaid)
    .where('isDeleted', query.isDeleted ?? false)
    .where('status', query.status)
    .count();
  const rows = await new OrderQuery()
    .search('invoice', query.invoice)
    .where('userId', query.userId)
    .where('isPaid', query.isPaid)
    .where('isDeleted', query.isDeleted ?? false)
    .where('status', query.status)
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

exports.find = async function (id, options = {}) {
  return await new OrderQuery()
    .if(options.populate, (query) => {
      query.with(['user', 'packet', 'perfume', 'details.item']);
    })
    .findByIdOrFail(id);
};

exports.findByInvoice = async function (invoice, options = {}) {
  return await new OrderQuery()
    .if(options.populate, (query) => {
      query.with(['user', 'packet', 'perfume', 'details.item']);
    })
    .where('invoice', invoice)
    .findOrFail();
};

exports.update = async function (order, body) {
  await OrderModel.updateOne(order, body);

  return order;
};

exports.updateStatus = async function (order, status) {
  if (order.status === 'taken')
    throw new BadRequestException({}, 'order.update-status-already-taken');
  if (status === 'processed' && order.status !== 'created')
    throw new BadRequestException(
      {},
      'order.update-status-processed-must-be-from-created'
    );
  if (status === 'finished' && order.status !== 'processed')
    throw new BadRequestException(
      {},
      'order.update-status-finished-must-be-from-processed'
    );
  if (status === 'taken' && (order.status !== 'finished' || !order.isPaid))
    throw new BadRequestException(
      {},
      'order.update-status-taken-must-be-finished-and-paid'
    );

  await OrderModel.updateOne(order, { status });

  return order;
};

exports.updatePayment = async function (order) {
  await OrderModel.updateOne(order, {
    isPaid: true,
  });

  return order;
};

exports.delete = async function (id) {
  const order = await new OrderQuery().findByIdOrFail(id);

  await OrderModel.updateOne(order, {
    isDeleted: true,
  });

  return order;
};
