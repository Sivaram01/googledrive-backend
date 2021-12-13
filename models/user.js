const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   firstname : {
     type: String,
     required : true,
     maxlength : 32,
     trim: true, 
   },
   lastname : {
     type: String,
     required : true,
     maxlength : 32,
     trim: true, 
   },
   email: {
     type: String,
     required : true,
     trim: true, 
     unique: true
   },
   password : {
     type: String,
     required : true 
   },
   date :{
     type : Date,
     default : Date.now 
   },

})

module.exports = mongoose.model('User' ,userSchema );