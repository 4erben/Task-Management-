const User = require("../models/users.model");
const {generateAccessToken, generateRefreshToken} = require("../utils/tokenUtils");



const loginUser = async(req,res)=>{
try{
    const {email,password} = req.body;
    const user = await User.login(email,password);

    //creating the refresh and access token to send to the frontend
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({accessToken,refreshToken,name:user.name});

}catch(error){
    res.status(500).json({message:"Sign in failed" , error : error.message})
}
};


const signupUser = async(req,res)=>{
    try{
        const {name,email,password} =req.body;
        const user = await User.signup(name,email,password);
        
        res.status(200).json({message: "User Registered Sucessfully!"})
    }catch(error){
        res.status(400).json(error.message);
    }
}

module.exports = {
    loginUser,
    signupUser
}