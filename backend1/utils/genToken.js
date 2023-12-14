const jwt  = require('jsonwebtoken');

const genToken = (res ,id) =>{
    const token =  jwt.sign({ id }, process.env.SECRET, { expiresIn: '30d' });
    res.cookie("auth", token , 
    { 
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days

    });
}
module.exports = genToken