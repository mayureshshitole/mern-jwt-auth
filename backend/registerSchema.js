const mongoose = require('mongoose');

const register = new mongoose.Schema({
    name:{type:"string",required:"true"},
    email:{type:"string",required:"true"},
    password:{type:"string",required:"true"},
})

module.exports = mongoose.model('Users',register)