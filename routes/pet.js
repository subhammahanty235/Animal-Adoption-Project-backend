const router = require("express").Router()
const fetchUser = require("../middleware/fetchuser.middleware")
const PetController = require("../controller/pet.controller")

router.post("/addnewad",fetchUser ,PetController.addNewPetAd )
router.delete("/deletead" , fetchUser.PetController.deleteAd)

module.exports = router;