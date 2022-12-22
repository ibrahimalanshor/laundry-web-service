const RefreshTokenModel = require('./model/refresh-token.model.js');
const RefreshTokenQuery = require('./refresh-token.query.js');

exports.create = async function (body) {
  return await RefreshTokenModel.create(body);
};

exports.findByToken = async function (token) {
  return await new RefreshTokenQuery()
    .where('token', token)
    .with(['user'])
    .findOrFail();
};

exports.delete = async function (idOrDocument) {
  const refreshToken =
    idOrDocument instanceof RefreshTokenModel
      ? idOrDocument
      : await new RefreshTokenQuery().findByIdOrFail(idOrDocument);

  await RefreshTokenModel.deleteOne(refreshToken);

  return refreshToken;
};

exports.deleteByToken = async function (token) {
  return await RefreshTokenModel.deleteOne({ token });
};
