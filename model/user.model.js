const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 25,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

    },
    
    password: {
        type: String,
        required: true
    },
    isrescuer: {
        type: Boolean,
        default: false,
    },
    isnormaluser: {
        type: Boolean,
        default: false
    }

})

const User = mongoose.model('user', UserSchema)
module.exports = User