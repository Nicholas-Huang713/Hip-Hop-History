const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    favelist: [],
    date: {
        type: String,
        default: Date.now()
    }
})

//Model
const Users = mongoose.model('Users', UserSchema);

module.exports = Users;