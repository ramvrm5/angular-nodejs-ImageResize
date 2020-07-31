var express = require('express');
var router = express.Router();
var userHandler = require("../handler/userHandler.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* LOGIN USER */
router.post('/login', function(req, res, next) {
  userHandler.login(req.body, (error, obj) => {
      if (error) {
        res.json(error);
      } else {
        res.json(obj);
      }
    });
});

module.exports = router;
