const { Controller } = require('../../common/controller');
const AuthService = require('./auth.service.js');
const { hideUserPasword } = require('./helpers/auth-password.helper.js');

exports.register = new Controller()
  .post(200)
  .ctx('body')
  .handle(async (ctx) => {
    const res = await AuthService.register(ctx.body);

    res.user = hideUserPasword(res.user);

    return res;
  });
exports.login = new Controller()
  .post(200)
  .ctx('body')
  .handle(async (ctx) => {
    const res = await AuthService.login(ctx.body);

    res.user = hideUserPasword(res.user);

    return res;
  });
exports.refreshToken = new Controller()
  .post(200)
  .ctx('body')
  .handle(async (ctx) => await AuthService.refreshToken(ctx.body.refreshToken));
exports.getProfile = new Controller()
  .get()
  .ctx('user')
  .handle((ctx) => ctx.user);
exports.updateProfile = new Controller()
  .post(200)
  .ctx('body', 'user')
  .handle(async (ctx) => await AuthService.updateProfile(ctx.user, ctx.body));
exports.updatePhoto = new Controller()
  .post(200)
  .ctx('user', 'file')
  .handle(
    async (ctx) => await AuthService.updatePhoto(ctx.user, ctx.file.filename)
  );
exports.updatePassword = new Controller()
  .post(200)
  .ctx('body', 'user')
  .handle(
    async (ctx) => await AuthService.updatePassword(ctx.user, ctx.body.password)
  );
exports.logout = new Controller()
  .post(200)
  .ctx('body', 'polyglot')
  .handle(async (ctx) => {
    await AuthService.logout(ctx.body.refreshToken);

    return {
      message: ctx.polyglot.t('auth.logout.success'),
    };
  });
