const { Controller } = require('../../common/controller');
const ItemService = require('./item.service');

exports.get = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await ItemService.get(ctx.query));

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => await ItemService.create(ctx.body));

exports.find = new Controller()
  .get()
  .ctx('params', 'query')
  .handle(async (ctx) => await ItemService.find(ctx.params.id));

exports.update = new Controller()
  .patch()
  .ctx('params', 'body')
  .handle(async (ctx) => await ItemService.update(ctx.params.id, ctx.body));

exports.updatePhoto = new Controller()
  .patch()
  .ctx('params', 'file')
  .handle(
    async (ctx) =>
      await ItemService.update(ctx.params.id, { photo: ctx.file.filename })
  );

exports.delete = new Controller()
  .patch()
  .ctx('params')
  .handle(async (ctx) => await ItemService.delete(ctx.params.id));
