const mongoose = require('mongoose')


// this model will keep the data of the animal after adoption to avoid data loss.
const AdoptedDataSchema = new mongoose.Schema({
    animaldata:{
        name:String,
        petadposted:Date,
        age:String,
        type:String,
        breed:String,
        photos:{
           type: [string]
        },
        about:String,
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

    },
    adoptionmodelData :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'adoptedanimals'
    }



})

const AdoptionData = mongoose.model('adoptiondata', AdoptedAnimalSchema)
module.exports = AdoptionData