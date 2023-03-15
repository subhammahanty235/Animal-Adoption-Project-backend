
const Pet = require('../model/pet.model');
const User = require("../model/user");
const Rescuer = require("../model/rescuer.model")
const NormalUser = require("../model/normaluser.model")

const AdoptionData = require("../model/adopteddata.model")

const adoptionCompleted = async(req,res)=>{

    const {
        userid , petid , proofofAdoption
    } = red.body

    let adopterData , petData;
    try {
        const userdata = await User.findOne({_id:userid});
        if(userdata.isRescuer == true){
            adopterData = await Rescuer.findOne({userId : userdata._id})

        }else{
            adopterData = await NormalUser.findOne({userId : userdata._id});
        }
        
        petData = await Pet.findOne({"_id":petid});

        const dataBundle = await new AdoptionData({
            animaldata:{
                name : petData.name , 
                petadposted : petData.createdAt ,
                age : petData.age,
                type : petData.type,
                breed : petData.breed ,
                photos : petData.photos,
                about : petData.about ,
                location : {
                    country: petData.location.country,
                    state: petData.location.state,
                    city: petData.location.city,
                    coords:{
                        longitude : petData.location.coords.longitude,
                        latitude : petData.location.coords.latitude
                    } ,
                    pincode: petData.location.pincode,
                }
            },
            adopterData:{
                name: adopterData.name , 
                isRescuer : userdata.isRescuer,
                contactDetails : {
                    email : adopterData.email,
                    contactnumber : adopterData.contactnumber,
                    socialmedia : {
                        facebook : adopterData.socialmedia.facebook,
                        instagram : adopterData.socialmedia.instagram,
                        linkedin : adopterData.socialmedia.linkedin,
                        youtube : adopterData.socialmedia.youtube,
                    }
                },
                profilepic : adopterData.profilepic,
                address:{
                    country: adopterData.address.country,
                    state : adopterData.address.state,
                    ciry : adopterData.address.city,
                }
            },

            proofofAdoption: proofofAdoption
        })

        await dataBundle.save().then(()=>{
            res.status(201).json({flag : true , message :"Adoption Completed"})
        }).catch((err)=>{
            res.status(400).json({flag:false , message : "Error Occured in server"})
        })

    } catch (error) {
        res.json(error);
    }
}

const getAllAdoptionDetails = async()=>{
    const user = req.user.id;
    if(!user){
        return res.json({message:"Sorry you are not authorized"});
    }
    try {
        const data = await AdoptionData.find({});
        res.json(data);
    } catch (error) {
        res.json(error);
    }

    
}



module.exports = {getAllAdoptionDetails , adoptionCompleted};
