var express = require('express');
var router = express.Router();
var imageHandler = require("../handler/imageHandler.js");

/* Image Resize */
router.post('/imgresize', function(req, res, next) {
    imageHandler.imgresize(req.body, (error, obj) => {
      if (error) {
        res.json(error);
      } else {
        res.json(obj);
      }
    });
});

/* Get Image */
router.post('/getImage', function(req, res, next) {
    imageHandler.getImage(req.body, (error, obj) => {
      if (error) {
        res.json(error);
      } else {
        res.json(obj);
      }
    });
});

module.exports = router;
