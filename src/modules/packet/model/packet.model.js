const { model } = require('mongoose');
const PacketSchema = require('./packet.schema');

module.exports = model('packet', PacketSchema);
