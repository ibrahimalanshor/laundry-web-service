const { Controller } = require('../../common/controller');
const { ForbiddenException } = require('../../common/exceptions');
const PaymentService = require('./payment.service.js');

exports.get = new Controller()
  .get()
  .ctx('user', 'query')
  .handle(async (ctx) => {
    if (
      ctx.user.role !== 'admin' &&
      ctx.query.userId !== ctx.user._id.toString()
    ) {
      throw new ForbiddenException();
    }

    return await PaymentService.get(ctx.query);
  });

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => await PaymentService.create(ctx.body));

exports.delete = new Controller()
  .patch()
  .ctx('params')
  .handle(async (ctx) => {
    const payment = await PaymentService.find(ctx.params.id);

    await PaymentService.delete(payment);
  });
