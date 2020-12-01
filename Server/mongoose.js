const mongoose = require('mongoose');

const Message = require('./models/message');

mongoose.connect(
  'mongodb+srv://RichardChannell:Montecristo69@cluster0.kt5oq.mongodb.net/Chatty?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
  console.log('Connected to the database!')
}).catch(() => {
  console.log('Connection failed oh noooooo!')
});

const saveMsg = async (req, res, next) => {
  const savedMessage = new Message({
    message: req.message.body
  })
  console.log(savedMessage)
  const result = await savedMessage.save();
  console.log(typeof savedMessage._id)
  res.json(result);
};

const getMessages = async (req, res, next) => {
  const messages = await Message.find()
  res.json(messages);
}

exports.saveMsg = saveMsg;
exports.getMessages = getMessages;