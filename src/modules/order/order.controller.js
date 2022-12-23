const { Controller } = require('../../common/controller');
const OrderService = require('./order.service');

exports.get = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await OrderService.get(ctx.query));

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => await OrderService.create(ctx.body));

exports.find = new Controller()
  .get()
  .ctx('params', 'query')
  .handle(async (ctx) => await OrderService.find(ctx.params.id));

exports.delete = new Controller()
  .patch()
  .ctx('params')
  .handle(async (ctx) => await OrderService.delete(ctx.params.id));
