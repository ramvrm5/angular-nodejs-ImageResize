
var imageSchema = require('../schema/imageSchema.js');
var Jimp = require("jimp")
var output;


exports.imgresize = function imgresize(myObj, callback) {
    let imgURL = myObj.link;
    Jimp.read(imgURL, function (err, img) {
        if (err) throw err;
        img.resize(50, 50).getBase64(Jimp.AUTO, function (err, img64) {
            myObj['baseUrl'] = img64;
            if (err) {
                output = { responseCode: err.code, error: true, errorMessage: err.message };
                return callback(null, output);
            } 
            else {
                imageSchema.find({ userId: myObj.userId }, function (err, result) {
                    if (result.length <= 0) {
                        var _imageSchema = new imageSchema(myObj);
                        _imageSchema.save(function (err, result) {
                            if (err) {
                                output = { responseCode: err.code, error: true, errorMessage: err.message };
                                return callback(null, output);
                            } else {
                                imageSchema.find({ userId: myObj.userId }, function (err, result) {
                                    if (result.length > 0) {
                                        output = { responseCode: 200, error: false, result: img64, openimage: imgURL };
                                        return callback(null, output)
                                    }
                                    else if (err) {
                                        output = { responseCode: err.code, error: true, errorMessage: err.message };
                                        return callback(null, output);
                                    }
                                })
                            }
                        })
                    }
                    else if (result.length > 0) {
                        imageSchema.findOneAndUpdate({ userId: myObj.userId }, { baseUrl: img64, link: myObj.link }, { upsert: true }, function (err, result) {
                            if (err) {
                                output = { responseCode: err.code, error: true, errorMessage: err.message };
                                return callback(null, output);
                            }
                            else {
                                output = { responseCode: 200, error: false, result: img64, openimage: imgURL };
                                return callback(null, output)
                            }
                        });
                    }
                })
            }
        });
    });
}

/* Get Image Start*/
exports.getImage = function getImage(myObj, callback) {
    imageSchema.find({ userId: myObj.userId }, function (err, result) {
        if (err) {
            output = { responseCode: err.code, error: true, errorMessage: err.message };
        }
        else {
            output = { responseCode: 200, error: false, result: result };
        }
        return callback(null, output)
    })
}
/* Get Image  End*/