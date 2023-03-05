const router = require('express').Router()
const fetchUser = require('../middleware/fetchuser.middleware')
const normalUserFunctions = require('../controllers/user.controller')

router.post('/register' , fetchUser , normalUserFunctions.registerasUser)
router.put('/edituser' , fetchUser , normalUserFunctions.editNormalUserDetails)
router.get('/getuser' , fetchUser , normalUserFunctions.getUserData)

module.export = router