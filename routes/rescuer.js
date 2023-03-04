const router = require('express').Router()
const fetchUser = require('../middleware/fetchuser.middleware')
const rescuerFunctions = require('../controllers/rescuer.controller')

router.post('/register' , fetchUser , rescuerFunctions.registerasRescuer)
router.put('/editrescuer' , fetchUser , rescuerFunctions.editRescuerDetails)
router.get('/getrescuer' , fetchUser , rescuerFunctions.getRescuerData)

module.export = router