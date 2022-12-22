const { AuthenticationException } = require('../../../common/exceptions');
const { crypt } = require('../../../common/helpers');

async function verifyPassword(plain, password) {
  const res = await crypt.compare(plain, password);

  if (!res)
    throw new AuthenticationException({}, 'auth.login.invalid-credential');

  return res;
}

function hideUserPasword(user) {
  const userObj = user.toObject();

  delete userObj.password;

  return userObj;
}

module.exports = { verifyPassword, hideUserPasword };
