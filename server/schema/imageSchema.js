var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    link: {type:String,required:true},
    userId: String,
    baseUrl: String,
});

var image = mongoose.model('image',imageSchema, 'image');
module.exports = image;