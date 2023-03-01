const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    id:{
        type:String,
    },
    password:{
        type:String,
    },
    totalnumberOfUsers:{
        type:Number,
        default:0,
    },
    userslist:{
        type:[String],
    },
    totalposts:{
        type:Number,
        default:0,
    },
    totalAdopted:{
        type:Number,
        default:0,
    },
    adoptedAnimals:{
        type:[String],
        
    },
    totalrescuers:{
        type:Number,
        default:0
    },
    rescuerslist:{
        type:[String]
    },
    totalvisits:{
        type:Number,
        default:0,
    },
    monthlyusers:[
        {
            year:{
                type:Number,
                month:{
                    type:String,
                    views:{
                        type:Number,
                        Default:0
                    }
                }
            },
            
        }
    ]

})

const Admin = mongoose.model('admin', UserSchema)
module.exports = Admin