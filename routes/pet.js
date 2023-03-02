const router = require("express").Router()
const fetchUser = require("../middleware/fetchuser.middleware")
const PetController = require("../controller/pet.controller")

router.post("/addnewad",fetchUser ,PetController.addNewPetAd )
router.delete("/deletead/:id" , fetchUser.PetController.deleteAd)
router.get("/allposts" ,PetController.getPetAds )
module.exports = router;