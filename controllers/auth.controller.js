const User = require('../model/user.model')

const createUserController = async (req, res) => {
    let success = false;

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     success = false;
    //     return res.status(400).json({ errors: errors.array() });
    // }
    //check wheather the user with this email already exists
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {

            success = false;
            return res.status(400).json({ error: "Sorry a user with this email already exists" })

        }
        //create a new user
        const salt = await bcrypt.genSalt(10);
        secpass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,

            password: secpass,

        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message)
        message = "Internal Server error , please try again later"
        res.status(500).send(message, "some error occured")
    }

}

const loginController = async (req, res) => {
    let success = false;
    //if there is any error , return bad request and the errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false;
            return res.status(404).json({ error: "Please try to log in with correct credentials" });
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            success = false;
            return res.status(404).json({ error: "Please try to log in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;

        res.json({ success, authtoken, })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error")
    }
}

const forgotpasswordController = async (req, res) => {
    try {
        
        let email = req.body.email
        let pwbyuser = req.body.newpw;
        const id2 = await User.findOne({ email })

        if (!id2) res.json({flag:false , message:"email id not found in our database"})

        
        const salt = await bcrypt.genSalt(10);
        secpassupd = await bcrypt.hash(pwbyuser, salt);
        const upd = await User.findByIdAndUpdate(id2, { $set: { password: secpassupd } });
        res.json({flag:true , message:"Successfull"})



    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server erraaaaor")
    }

}

const SetUserTypeController = async(req,res)=>{
    try {
        let id = req.user.id;
        let choice = req.params.choice;
        if(choice === 1){
            try {
                User.findByIdAndUpdate(id , {$set:{isrescuer:true}})
                res.json({flag:true})
                
            } catch (error) {
                res.status(500).json({flag:false , message:"internal server erraaaaor"})
            }

        }
        else if(choice == 2){
            try {
                User.findByIdAndUpdate(id , {$set:{isnormaluser:true}})
                res.json({flag:true})
                
            } catch (error) {
                res.status(500).json({flag:false , message:"internal server erraaaaor"})
            }
        }


    } catch (error) {
        res.status(500).json({flag:false , message:"internal server erraaaaor"})
    }
}


module.exports = {createUserController , loginController , SetUserTypeController , forgotpasswordController}