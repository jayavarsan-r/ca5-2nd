const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id:{type:String , required: true},
    name: { type: String, required: true },
    gender: { type: String, required: true }
})

const usermodel = mongoose.model("counetruser",UserSchema)

module.exports = usermodel