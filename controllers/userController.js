const userCtrl = { }
const Users = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

userCtrl.registration = async(req , res) => {
    const { name , email , password , password2 } = req.body

    if (!name || !email || !password || !password2) {
        res.json("All the fields have to be complete")
    } else {
        const user = await Users.findOne({email : email})
        if (user) {
            res.json("This Email is already in use")
        } else {
            if (password.length < 6) {
                res.json("The Password must contain at least 6 characters")
            } else {
                if (password !== password2) {
                    res.json("The Password don´t match")
                } else {
                    const newUser = new Users({
                        name : name ,
                        email : email , 
                        password : password
                    })

                    bcrypt.genSalt(10 , function(err , salt){
                        bcrypt.hash(newUser.password , salt , function(err , hash){
                            if (err) throw err
                            newUser.password = hash
                            newUser.save()
                             .then(newUser => {
                                let payload = { subject : newUser._id}
                                let token = jwt.sign(payload , "secretKey")
                                res.status(200).send({token})
                             })
                             .catch(err => {
                                 console.log(err)
                             })
                        })
                    })
                    
                }
            }
        }
    }
}

userCtrl.login = async(req , res) => {
    const { email , password } = req.body

    if (!email || !password) {
        res.json("All the fields have to be complete")
    } else {
        const user = await Users.findOne({email : email})
        if (!user) {
            res.json("Incorrect Email !")
        } else {
            bcrypt.compare(password , user.password , function(err , result){
                if (err) {
                    res.json(err)
                } else {
                    if (!result) {
                        res.json("Incorrect Password !")
                    } else {
                        let payload = { subject : user._id}
                        let token = jwt.sign(payload , "secretKey")
                        res.status(200).send({token})
                    }
                }
            })
        }
    }
}

module.exports = userCtrl