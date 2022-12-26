const { BadRequestException } = require('../../common/exceptions/index.js');
const OrderService = require('../order/order.service.js');
const PaymentModel = require('./model/payment.model.js');
const PaymentQuery = require('./payment.query.js');
const { getLatestInvoice } = require('./payment.helper.js');

exports.get = async function (query) {
  const count = await new PaymentQuery()
    .search('invoice', query.invoice)
    .where('userId', query.userId)
    .count();
  const rows = await new PaymentQuery()
    .search('invoice', query.invoice)
    .where('userId', query.userId)
    .sort(query.sort)
    .paginate({ page: query.page, limit: query.limit });

  return { count, rows };
};

exports.find = async function (id) {
  return await new PaymentQuery().findByIdOrFail(id);
};

exports.create = async function (body) {
  const order = await OrderService.find(body.orderId);

  if (body.amount < order.totalPrice) {
    throw new BadRequestException(
      {},
      'payment.amount-must-be-min-order-total-price'
    );
  }

  const invoice = await getLatestInvoice();
  const payment = await PaymentModel.create({
    invoice,
    ...body,
  });

  await OrderService.updatePayment(order);

  return payment;
};

exports.delete = async function (payment) {
  await PaymentModel.deleteOne(payment);

  return payment;
};
