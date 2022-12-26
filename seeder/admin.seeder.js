const config = require('../config');
const { connect } = require('../src/lib/database');
const UserService = require('../src/modules/user/user.service.js');

const run = async () => {
  try {
    await connect(config.db.url);
    await UserService.create({
      username: 'admin',
      name: 'Admin',
      email: `admin@admin`,
      password: 'adminpassword',
      photo: 'admin.jpg',
    });
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
};

run();
