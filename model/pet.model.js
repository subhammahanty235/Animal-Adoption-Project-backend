const mongoose = require('mongoose')

const PetSchema = mongoose.Schema({
    postBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    petAdId:{
        type:String,
    },
    location:{
        country:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        coords:{
            longitude:{
                type:String,
                
            },
            latitude:{
                type:String,
            
            }
        },
        pincode:{
            type:Number,
            required:true,
            min:4,
            max:8
        }

    },
    
    name: {
        type: String,
        required: true,
    },
    photes:{
        type:[String]
    },
    about:{
        type:String,
    },
    type: {
        type: String,

    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Number,
        deafult: 1,          //1 for not  adopted yet , 2 for adopted
    },
    views: {
        type: Number,
        default: 0,
    },
    interests: {
        type: [String]
    },
    age: {
        type: Number,
    },
    breed: {
        type: String,
    },
    vaccinated: {
        type: Boolean,
        default: false,
    },





})

const Pet = mongoose.model('petposts', UserSchema)
module.exports = Pet
