const mongoose = require('mongoose')

const AdoptedAnimalSchema = mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'pet'
    },
    postedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    adoptedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    adoptionDate:{
        type:Date,
        default:Date.now()
    },
    review:{
        reciever:{
            type:String
        },
        giver:{
            type:String
        }
    },
    adopteddataSchemadata:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'adoptiondata'
    }






})

const AdoptedAnimals = mongoose.model('adoptedanimals', AdoptedAnimalSchema)
module.exports = AdoptedAnimals