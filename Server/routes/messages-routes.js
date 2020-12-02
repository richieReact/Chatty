const express = require('express');

const router = express.Router();



router.get('/:mid', (req, res, next) => {
  console.log('get request in messages')
  res.json({message: 'It works!'})
});

module.exports = router;