const { Query } = require('../../common/query');
const UserModel = require('./model/user.model');

function UserQuery() {
  Query.call(this, UserModel);
}

UserQuery.prototype = Object.create(Query.prototype, {
  constructor: {
    value: UserQuery.constructor,
  },
});

UserQuery.prototype.withPassword = function () {
  return this.select('+password');
};

module.exports = UserQuery;
