const { model } = require('mongoose');
const PerfumeSchema = require('./perfume.schema');

module.exports = model('perfume', PerfumeSchema);
