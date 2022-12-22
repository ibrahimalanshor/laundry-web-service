const { AuthenticationException } = require('../../common/exceptions');
const { token } = require('../../common/helpers');
const UserQuery = require('../user/user.query.js');

module.exports = async function (req, res, next) {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) throw new Error('auth.token-required');

    const payload = await token.verify(accessToken);
    const user = await new UserQuery().findByIdOrFail(payload.userId);

    req.auth = payload;
    req.user = user;

    next();
  } catch (err) {
    if (err instanceof AuthenticationException) {
      return next(err);
    }

    next(new AuthenticationException({}, err.message));
  }
};
