const slugify = require('slugify');

exports.slugify = (str) => slugify(str, { lower: true });
