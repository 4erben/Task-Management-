const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenUtils");

const refreshToken = async(req,res)=>{
    const { refreshToken } = req.body;
    try{
        if(!refreshToken){
            return res.status(400).json({message:"Refresh token required!"});
        }
    
        const payload = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        const {userId} = payload;
        
        
        const user = await User.findById(userId);
        
        //this solution is worst for the perfomance but more consistent 
        // if we changed the user access level while he is still signed in he will need to resign to get the update
        /* const user = {
            access_level: payload.access_level,
            id: payload.userId
        } */
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        res.status(201).json({accessToken: newAccessToken, refreshToken:newRefreshToken});

    }catch(error){
        res.status(403).json({message:"Invalid or expired refresh token",error:error.message});
    }
}

module.exports = refreshToken;