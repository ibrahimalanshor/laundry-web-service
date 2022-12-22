const { crypt } = require('../../common/helpers');
const { ConflictException } = require('../../common/exceptions');
const UserModel = require('./model/user.model.js');
const UserQuery = require('./user.query.js');

exports.find = async function (id) {
  return await new UserQuery().findByIdOrFail(id);
};

exports.findByEmail = async function (email, options = {}) {
  return await new UserQuery()
    .where('email', email)
    .if(options.withPassword, (query) => {
      query.withPassword();
    })
    .findOrFail();
};

exports.create = async function (body) {
  try {
    const password = await crypt.generate(body.password);

    return await UserModel.create({
      ...body,
      password,
    });
  } catch (err) {
    if (err.code === 11000) {
      throw new ConflictException();
    }

    throw err;
  }
};

exports.update = async function (user, body) {
  try {
    return await UserModel.updateOne(user, body);
  } catch (err) {
    if (err.code === 11000) {
      throw new ConflictException();
    }

    throw err;
  }
};

exports.updatePassword = async function (user, password) {
  const cryptedPassword = await crypt.generate(password);

  return await UserModel.updateOne(user, {
    password: cryptedPassword,
  });
};
