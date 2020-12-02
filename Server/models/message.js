const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  body:{ type: String, required: true },
  creator: { type: String, require: true }
})

module.exports = mongoose.model('Message', messageSchema);