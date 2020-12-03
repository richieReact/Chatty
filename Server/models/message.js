const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: false }
})

module.exports = mongoose.model('Message', messageSchema);