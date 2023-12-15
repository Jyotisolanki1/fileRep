const asyncHandler  = require('express-async-handler');
const jwt  = require('jsonwebtoken');
const User = require('../model/userModel')

const authMiddleware = asyncHandler(
    async(req, res, next) => {
      console.log("here")
     let token;
     token = req.cookies.auth;
    
     if(token){
        try {
            
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
         console.error(error);
          res.status(401);
        throw new Error('Not authorized, token failed');
        }
     } else {
        res.status(401);
        throw new Error('Not authorized, no token');
      }
    }
)
module.exports = authMiddleware;