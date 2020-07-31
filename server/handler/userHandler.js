var mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('../config.js');
var userSchema = require('../schema/userSchema.js');
var output;


exports.login = function login(myObj, callback) {
    userSchema.find({ email: myObj.email }, function (err, result) {
        if (result.length <= 0) {
            var _userSchema = new userSchema(myObj);
            _userSchema.save(function (err, result) {
                if (err) {
                    output = { responseCode: err.code, error: true, errorMessage: err.message };
                    return callback(null, output);
                } else {
                    userSchema.find({ email: myObj.email }, function (err, result) {
                        if (result.length > 0) {
                            let token = jwt.sign({ email: myObj.email }, config.secret, { expiresIn: '720h' });
                            output = { responseCode: 200, error: false, result: { "id": result[0].id, "email": result[0].email, }, Token: token };
                            return callback(null, output)
                        }
                        else if(err){
                            output = { responseCode: err.code, error: true, errorMessage: err.message };
                            return callback(null, output);
                        }
                    })
                }
            })
        }
        else if (result.length > 0){
            let token = jwt.sign({ email: myObj.email }, config.secret, { expiresIn: '720h' });
            output = { responseCode: 200, error: false, result: { "id": result[0].id, "email": result[0].email, }, Token: token };
            return callback(null, output)
        }
    })
}