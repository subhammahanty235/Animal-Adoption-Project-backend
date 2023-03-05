const NormalUser = require("../model/normaluser.model")
const registerasUser = async(req,res)=>{
    const data = req.body
    const userId = req.user.id;

    try {
        const userData = await NormalUser.findOne({_id:userId})
        if(userData.isrescuer){
            return res.status(500).send("You are not allowed to register a Rescuer")
        }
        if(userData.isnormaluser){
            return res.status(501).send("You are already registered")
        }
        const NormalUserData = new NormalUser({
            name : userData.name,
            email : userData.email,
            profilepic : data.profilepic,
            contactnumber:data.contactnumber,
            location: data.location,
            socialmedia : data.socialmedia
        })

        NormalUserData.save().then(()=>{
            res.status(201).send("Registered Succesfully")
        }).catch((err)=>{
            res.status(400).send(err)
        })
    } catch (error) {
        res.status(400).send(err)
    }
}

const getUserData = async(req,res)=>{
    const userId = req.params.id

    try {
        const userData = await NormalUser.findOne({userId:userId}).select("-password -_id ")
        if(!userData){
            return res.status(404).send("User Not Found")
        }

        res.status(201).json(userData)
    } catch (error) {
        res.status(404).send("Internal error occured")
    }
}

const editNormalUserDetails = async(req,res)=>{
    const newData = req.body
    const userid = req.user.id;

    try {
        const dataDict = {}
        if(newData.name) dataDict.name =  newData.name 
        if(newData.profilepi) dataDict.profilepic = dataDict.profilepic
        if(newData.location) dataDict.location =  newData.location 
        if(newData.socialmedia) dataDict.socoalmedia =  newData.socoalmedia 
        

        await NormalUser.findByIdAndUpdate(userid , dataDict , {new:true})
        .then(()=>{
            return res.status(201).send("Data Updated Successfully")
        })
        .catch(()=>{
            return res.status(400),send("Error Updating your data")
        })
    } catch (error) {
        res.status(400).send("Internal error occured")
    }
}


module.exports = {editNormalUserDetails , registerasUser , getUserData}