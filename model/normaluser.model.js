const mongoose = require('mongoose')

const NormalUserSchema = mongoose.Schema({
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
    profilepic:{
        type:String,
    },
    contactnumber: {
        type: String,
        required: true,

    },
    totalPosts:{
        type:Number,
        default:0
    },
    posts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'pet'
    },
    totaladopted:{
        type:Number,
        default:0
    },

    location: {

        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }

    },

    
    


})

const NormalUser = mongoose.model('normalusers', NormalUserSchema)
module.exports = NormalUser