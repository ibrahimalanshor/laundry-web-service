const bcrypt = require('bcrypt');

exports.generate = async function (plain) {
  return await bcrypt.hash(plain, 10);
};

exports.compare = async function (plain, hash) {
  return await bcrypt.compare(plain, hash);
};
