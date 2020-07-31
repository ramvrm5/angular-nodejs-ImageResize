var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type:String,required:true},
    password:{type:String,required:true}
});

var user = mongoose.model('user',userSchema, 'user');
module.exports = user;