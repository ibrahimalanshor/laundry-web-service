const config = require('../../../../config');
const { token } = require('../../../common/helpers');
const RefreshTokenService = require('../../refresh-token/refresh-token.service.js');

async function generateAccessToken(user, refreshToken) {
  return await token.generate(
    { userId: user._id, refreshToken },
    { expiresIn: config.auth.accessTokenExpiresIn }
  );
}

async function generateRefreshToken(user) {
  const generatedToken = await token.generate(
    { userId: user._id },
    { expiresIn: config.auth.refreshTokenExpiresIn }
  );

  await RefreshTokenService.create({ token: generatedToken, userId: user._id });

  return generatedToken;
}

async function generateToken(user) {
  const refreshToken = await generateRefreshToken(user);
  const accessToken = await generateAccessToken(user, refreshToken);

  return { accessToken, refreshToken };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
};
