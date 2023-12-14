const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const genToken = require('../utils/genToken');

const getUser = asyncHandler(
    async (req, res) => {
        console.log("get user data");
    }
)

//register email
const registerUser = asyncHandler(
    async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (name == "undefined") {
                throw new Error("Name is required");
            }
            if (email == "undefined") {
                throw new Error("Email is required");
            }
            if (password == "undefined") {
                throw new Error("Password is required");
            }
            const profile = req?.file?.filename;
            const user = await User.findOne({ email });
            if (user) {
                console.log("inside user")
                res.status(400).json({ message: "Email is already in user" })
            } else {
                console.log("inside newuser")
                const newUser = await User.create({
                    name, email, password, profile
                })
                if (newUser) {
                    genToken(res, newUser._id)
                    res.status(200).json(newUser)
                }
            }
        } catch (error) {
            console.log("inside user")
            throw new Error(error)
        }
    }
)

//login user
const loginUser = asyncHandler(
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (user && (await user.isPasswordMatch(password))) {
                genToken(res, user._id)
                res.status(400).json(user)
            } else {
                res.status(401);
                throw new Error('Invalid email and password')
            }

        }
        catch (error) {
            throw new Error(error)
        }
    }
)

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('auth', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ msg: "user logout success" });
});
module.exports = { getUser, registerUser, loginUser, logoutUser }