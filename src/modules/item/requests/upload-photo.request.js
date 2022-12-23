const path = require('path');
const { createStorage } = require('../../../common/upload');

module.exports = createStorage({
  field: 'photo',
  path: '/item/photos',
  extension: ['.png', '.jpg'],
  getFilename: (req, file) =>
    file.fieldname + '-' + Date.now() + path.extname(file.originalname),
});
