const { Controller } = require('../../common/controller');
const ReviewService = require('./review.service');

exports.get = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await ReviewService.get(ctx.query));

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => await ReviewService.create(ctx.body));

exports.find = new Controller()
  .get()
  .ctx('params', 'query')
  .handle(async (ctx) => await ReviewService.find(ctx.params.id));

exports.delete = new Controller()
  .patch()
  .ctx('params')
  .handle(async (ctx) => await ReviewService.delete(ctx.params.id));
