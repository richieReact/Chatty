const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  body: { type: String, required: true },
  username: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true }
})

module.exports = mongoose.model('Message', messageSchema);