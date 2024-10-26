const jwt = require("jsonwebtoken");


function generateAccessToken(user){
    return jwt.sign(
        {userId: user.id ,name:user.name,email:user.email },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION}
    );
}

function generateRefreshToken(user){
    return jwt.sign(
        {userId: user.id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRATION}
    );
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};