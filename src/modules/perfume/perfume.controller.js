const { Controller } = require('../../common/controller');
const PerfumeService = require('./perfume.service');

exports.get = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await PerfumeService.get(ctx.query));

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => await PerfumeService.create(ctx.body));

exports.find = new Controller()
  .get()
  .ctx('params', 'query')
  .handle(async (ctx) => await PerfumeService.find(ctx.params.id));

exports.update = new Controller()
  .patch()
  .ctx('params', 'body')
  .handle(async (ctx) => await PerfumeService.update(ctx.params.id, ctx.body));

exports.updateStock = new Controller()
  .patch()
  .ctx('params', 'body')
  .handle(
    async (ctx) =>
      await PerfumeService.updateStock(
        ctx.params.id,
        ctx.body.type === 'increment' ? ctx.body.stock : -ctx.body.stock
      )
  );

exports.delete = new Controller()
  .patch()
  .ctx('params')
  .handle(async (ctx) => await PerfumeService.delete(ctx.params.id));
