const { StatusCodes } = require("http-status-codes");
var jwt = require('jsonwebtoken');
const User = require("../models/user");

const registerUser = async (req, res) => {
    res.json({msg : 'Register User not implmented yet :('})
}

const loginUser = async (req, res) => {
   let { password, email } = req.body;
    if(!password || !email) {
        res.status(StatusCodes.ACCEPTED).json({msg : 'Email & Password is required'});
    }
    let foundUser = await User.findOne({where : {email}});
    console.log("foundUser",foundUser)
    if(foundUser) {
        if(password == foundUser.password){
            const token = jwt.sign({email, username : foundUser.username }, process.env.JWT_KEY, {expiresIn : "7d"});
            console.log("token",token)
            res.status(StatusCodes.ACCEPTED).json({msg : 'User Registerd',token, success : true});
        }
        else    
            res.status(StatusCodes.NOT_ACCEPTABLE).json({msg : 'Password is incorrect'})
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({msg : 'User not found this email or invalid email'})
    }
}

module.exports = {
    registerUser,
    loginUser
}