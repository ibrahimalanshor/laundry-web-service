const { Controller } = require('../../common/controller');
const { ForbiddenException } = require('../../common/exceptions');
const OrderService = require('./order.service');

exports.get = new Controller()
  .get()
  .ctx('query', 'user')
  .handle(async (ctx) => {
    if (
      ctx.user.role !== 'admin' &&
      ctx.query.userId !== ctx.user._id.toString()
    ) {
      throw new ForbiddenException();
    }

    return await OrderService.get(ctx.query);
  });

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => await OrderService.create(ctx.body));

exports.find = new Controller()
  .get()
  .ctx('params', 'query', 'user')
  .handle(async (ctx) => {
    const order = ctx.query.invoice
      ? await OrderService.findByInvoice(ctx.params.idOrInvoice, {
          populate: true,
        })
      : await OrderService.find(ctx.params.idOrInvoice, { populate: true });

    if (ctx.user.role !== 'admin') ctx.user.canAccessOrder(order);

    return order;
  });

exports.updateStatus = new Controller()
  .get()
  .ctx('params', 'user', 'body')
  .handle(async (ctx) => {
    const order = await OrderService.find(ctx.params.id);

    if (ctx.user.role !== 'admin') ctx.user.canAccessOrder(order);

    await OrderService.updateStatus(order, ctx.body.status);

    return order;
  });

exports.delete = new Controller()
  .patch()
  .ctx('params')
  .handle(async (ctx) => await OrderService.delete(ctx.params.id));
