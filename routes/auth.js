const router = require('express').Router()
const AuthController = require('../controllers/auth.controller');
const fetchUser = require('../middleware/fetchuser.middleware');

router.post('/createnewuser' ,AuthController.createUserController );
router.post('/login' , AuthController.loginController)
router.put('/forgetpassword' , AuthController.forgotpasswordController)
router.put('/settype' ,fetchUser  , AuthController.SetUserTypeController)