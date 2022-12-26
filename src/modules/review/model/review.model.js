const { model } = require('mongoose');
const ReviewSchema = require('./review.schema');

module.exports = model('review', ReviewSchema);
