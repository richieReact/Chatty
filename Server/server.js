const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const bodyParser = require('body-parser');
const mongoPractice = require('./mongoose');
// const message = require("../src/backend/Server/models/message");

app.use(bodyParser.json());

app.post('/messages', mongoPractice.saveMsg);
app.post('/messages', )

app.get('/messages', mongoPractice.getMessages);

io.on("connection", socket => {
    socket.emit('your id', socket.id);
    socket.on('send message', body => {
        io.emit('message', body)
    })
    console.log("connected")
})

io.on('send message', body => {
    const datam = req.body;
    mongoPractice.saveMsg(datam)
    console.log('Message saved to collection?')
})

server.listen(8000, () => console.log("server is running on port 8000"));