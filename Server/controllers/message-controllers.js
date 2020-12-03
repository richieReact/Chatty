const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const message = require('../../Chatty/src/backend/Server/models/message');


let DUMMY_MESSAGES = [
  {
    id: 'm1',
    body: 'This is the dummy message',
    creator: 'u1'
}];

// Functions needed:
//   - POST a newly created message
//   - GET saved messages and display them to the entire chatroom. I'm gonna start with this just being one big chatroom with all the users, and a list of users to the left. Should include the message and the name of the creator. Maybe also a timestamp?

