const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const bodyParser = require('body-parser');
const Message = require("./models/message");
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(
  'mongodb+srv://RichardChannell:Montecristo69@cluster0.kt5oq.mongodb.net/Chatty?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to the database!')
  }).catch(() => {
    console.log('Connection failed oh noooooo!')
});

// Parse the request body as JSON
app.use(bodyParser.json());

// GET messages
app.get('/api/messages', (req, res) => {
  Message.find({}).exec((err, messages) => {
    if(err) {
       res.send(err).status(500);
    } else {
       res.send(messages).status(200);
    }
  });
});

// POST messages
app.post('/api/messages', (req, res) => {
  Message.create(req.body).then((message) => {
      res.send(message).status(200);
  }).catch((err) => {
      console.log(err);
      res.send(err).status(500);
  });
});

// Socket.io connection
io.on("connection", socket => {
  socket.emit('your id', socket.id);
  socket.on('send message', body => {
      io.emit('message', body)
  })
  console.log("connected")
})

server.listen(8000, () => console.log("server is running on port 8000"));