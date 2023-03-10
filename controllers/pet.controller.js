const Pet = require('../model/pet.model')

const addNewPetAd = async(req,res)=>{
    const userId = req.user.id
    try {
        const data = req.body

        const res = new Pet(data);
        res.save().then(petAd => {
            res.status(201).json({ message: 'Ad added successfully', user });
        })
        .catch((err)=>{res.status(404).json({ message: 'Unsuccessfull' });})

    } catch (error) {
        res.status(404).json({ message: 'Internal error occured' });
    }
}

const getPetAds = async(req,res)=>{
    const {filterquery} = req.query || {type:"dog"}
    const {page , limit} = req.query
    const options = {};
    if(limit){
        options.limit = parseInt(limit , 10);
    }
    if(page){
        options.skip = (parseInt(page , 10)-1)* options.limit || 0;

    }

    const petAds = await Pet.find(filterquery , null , options)
    .then((data)=>{
        res.status(201).json({no_posts : len(data) , data:data})
    })
    .catch((err)=>{
        res.status(404).json({ message: 'Internal error occured' });
    })
    

}

const deleteAd = async(req,res)=>{
    const userId = req.user.id;
    const postid = req.params.id
    try {
        const checkauth = await Pet.findOne({_id:post_id}).select("_id")
        if(checkauth._id !== userId){
            return res.status(400).send("You are not allowed to remove that ad")
    
        }
        else{
            Pet.findByIdAndDelete(postid)
            .then((data)=>{res.status(201).send("Deleted Successfully")})
            .catch((err)=>{
                res.status(404).send("Error occured , please try again later!")
            })
        }
        
    } catch (error) {
        res.status(404).send("internal error occured")
    }

}



module.exports = {addNewPetAd , deleteAd , getPetAds}

