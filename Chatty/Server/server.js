const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const bodyParser = require('body-parser');
const mongoPractice = require('./mongoose');

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

server.listen(8000, () => console.log("server is running on port 8000"));