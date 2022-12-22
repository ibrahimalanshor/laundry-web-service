const { Controller } = require('../../common/controller');
const PacketService = require('./packet.service');

exports.get = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await PacketService.get(ctx.query));

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => await PacketService.create(ctx.body));

exports.find = new Controller()
  .get()
  .ctx('params', 'query')
  .handle(async (ctx) => await PacketService.find(ctx.params.id));

exports.update = new Controller()
  .patch()
  .ctx('params', 'body')
  .handle(async (ctx) => await PacketService.update(ctx.params.id, ctx.body));

exports.updatePhoto = new Controller()
  .patch()
  .ctx('params', 'file')
  .handle(
    async (ctx) =>
      await PacketService.update(ctx.params.id, { photo: ctx.file.filename })
  );

exports.delete = new Controller()
  .patch()
  .ctx('params')
  .handle(async (ctx) => await PacketService.delete(ctx.params.id));
