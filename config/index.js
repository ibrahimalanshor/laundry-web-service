if (process.env.NODE_ENV === 'development') require('dotenv/config');

const path = require('path')

module.exports = {
  env: process.env.NODE_ENV,
  app: {
    port: process.env.PORT || process.env.APP_PORT || 4000,
    key: process.env.APP_KEY || 'secret',
    locale: process.env.APP_LOCALE || 'en',
    uploadDir: path.join(__dirname, '../', process.env.APP_UPLOAD_DIR || 'uploads')
  },
  db: {
    url: process.env.DB_URL,
  },
  auth: {
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
  },
};
