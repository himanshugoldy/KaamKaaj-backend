const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sendCookie  = require('../utils/features.js');



class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
}

const register = async(req,res,next)=>{
    try {
        const {name,email,password} = req.body;
        let user = await User.findOne({email});


        if (user) return next(new ErrorHandler("User Already Exist", 400));

        const hashedPassword = await bcrypt.hash(password,10);
        user = await User.create({name,email,password:hashedPassword});
        
        sendCookie(user,res,"Registered Successfully",201);
    } catch (error) {
        next(error);
    }
}

const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email}).select("+password");

        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch)
        return next(new ErrorHandler("Invalid Email or Password", 400));

        sendCookie(user,res,`Welcome Back ${user.name}`,201);
    } catch (error) {
        next(error);
    }

}

const getMyProfile = (req,res)=>{
    
    res.status(200).json({
        success:true,
        user:req.user,
    })
}

const logout = (req,res)=>{
    
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    }).json({
        success:true,
    })
}

module.exports = {login,register,getMyProfile,logout};