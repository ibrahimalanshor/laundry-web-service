const {
  ConflictException,
  AuthenticationException,
  NotFoundException,
} = require('../../common/exceptions');
const UserService = require('../user/user.service.js');
const RefreshTokenService = require('../refresh-token/refresh-token.service.js');
const {
  generateToken,
  generateAccessToken,
} = require('./helpers/auth-token.helper.js');
const { verifyPassword } = require('./helpers/auth-password.helper.js');

async function register(credential) {
  try {
    const user = await UserService.create(credential);
    const token = await generateToken(user);

    return { user, token };
  } catch (err) {
    if (err instanceof ConflictException) {
      throw new AuthenticationException({}, 'auth.register.already-exists');
    }

    throw err;
  }
}

async function login(credential) {
  try {
    const user = await UserService.findByEmail(credential.email, {
      withPassword: true,
    });

    await verifyPassword(credential.password, user.password);

    const token = await generateToken(user);

    return { user, token };
  } catch (err) {
    if (err instanceof NotFoundException) {
      throw new AuthenticationException({}, 'auth.login.invalid-credential');
    }

    throw err;
  }
}

async function refreshToken(token) {
  try {
    const savedToken = await RefreshTokenService.findByToken(token);
    const generatedAccessToken = await generateAccessToken(savedToken.user._id);

    return { accessToken: generatedAccessToken };
  } catch (err) {
    if (err instanceof NotFoundException) {
      throw new AuthenticationException({}, 'auth.token-invalid');
    }

    throw err;
  }
}

async function updateProfile(user, body) {
  try {
    await UserService.update(user, body);

    return user;
  } catch (err) {
    if (err instanceof ConflictException) {
      throw new AuthenticationException(
        {},
        'auth.update-profile.already-exists'
      );
    }

    throw err;
  }
}

async function updatePassword(user, password) {
  await UserService.updatePassword(user, password);

  return user;
}

async function logout(token) {
  try {
    await RefreshTokenService.deleteByToken(token);
  } catch (err) {
    if (err instanceof NotFoundException) {
      throw new AuthenticationException({}, 'auth.token-invalid');
    }

    throw err;
  }
}

module.exports = {
  register,
  login,
  refreshToken,
  updateProfile,
  updatePassword,
  logout,
};
