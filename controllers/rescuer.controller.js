
const registerasRescuer = async(req,res)=>{
    const data = req.body
    const userId = req.user.id;

    try {
        const userData = await User.findOne({_id:userId})
        if(userData.isnormaluser){
            return res.status(500).send("You are not allowed to register a Rescuer")
        }
        if(userData.isrescuer){
            return res.status(501).send("You are already registered")
        }
        const RescuerData = new Rescuer({
            name : userData.name,
            email : userData.email,
            profilepic : data.profilepic,
            contactnumber:data.contactnumber,
            workhours : data.workhours,
            location: data.location,
            socialmedia : data.socialmedia
        })

        RescuerData.save().then(()=>{
            res.status(201).send("Registered Succesfully")
        }).catch((err)=>{
            res.status(400).send(err)
        })
    } catch (error) {
        res.status(400).send(err)
    }
}

const getRescuerData = async(req,res)=>{
    const userId = req.params.userId

    try {
        const userData = await Rescuer.findOne({userId:userId}).select("-password -_id ")
        if(!userData){
            return res.status(404).send("User Not Found")
        }

        res.status(201).json(userData)
    } catch (error) {
        res.status(404).send("Internal error occured")
    }
}

const editRescuerDetails = async(req,res)=>{
    const newData = req.body
    const userid = req.user.id;

    try {
        const dataDict = {}
        if(newData.name) dataDict.name =  newData.name 
        if(newData.profilepi) dataDict.profilepic = dataDict.profilepic
        if(newData.workhours) dataDict.workhours =  newData.workhours 
        if(newData.location) dataDict.location =  newData.location 
        if(newData.socialmedia) dataDict.socoalmedia =  newData.socoalmedia 
        

        await Rescuer.findByIdAndUpdate(userid , dataDict , {new:true})
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

module.exports = {editRescuerDetails , registerasRescuer , getRescuerData}