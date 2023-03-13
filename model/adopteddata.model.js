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
    adopterData:{
        name:{
            type:String,
        },
        isrescuer:{
            type:Boolean
        },
        contactDetails:{
            email:{
                type:String,
            },
            contactnumber:{
                type:String,
            },
            socialmedia:{
                facebook:{
                    type: String,
                },
                instagram:{
                    type: String,
                },
                linkedin:{
                    type: String,
                },
                youtube : {
                    type: String,
                }
            }
        },
        profilePic:{
            type:String,
        },
        address:{
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


    },
    dateofAdoption:{
        type:Date,
        default: Date.now()
    },

    prrofofAdoption : {
        type : String ,
        required : true,
    }


})

const AdoptionData = mongoose.model('adoptiondata', AdoptedAnimalSchema)
module.exports = AdoptionData