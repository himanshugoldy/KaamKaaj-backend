const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token) return res.status(404).json({
        success:true, 
        message:"Login First",
    })

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();

}



module.exports = isAuthenticated