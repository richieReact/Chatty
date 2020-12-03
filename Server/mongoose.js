const mongoose = require('mongoose');

const Message = require('./models/message');




// This needs to work with socket.io messages
const saveMsg = async (req, res, next) => {
  const savedMessage = new Message({
    message: req.body
  })
  console.log(savedMessage)
  const result = await savedMessage.save();
  console.log(typeof savedMessage._id)
  res.json(result);e
};

const getMessages = async (req, res, next) => {
  const messages = await Message.find()
  res.json(messages);
}


exports.saveMsg = saveMsg;
exports.getMessages = getMessages;