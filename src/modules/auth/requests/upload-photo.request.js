const path = require('path');
const { createStorage } = require('../../../common/upload');

module.exports = createStorage({
  field: 'photo',
  path: '/user/photos',
  extension: ['.png', '.jpg'],
  getFilename: (req, file) =>
    req.user.username + '-' + Date.now() + path.extname(file.originalname),
});
