const jwt = require("jsonwebtoken");

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"];

    if(!authHeader) return res.status(401).json({ message: "Request is not authorized" });;
    const token = authHeader && authHeader.split(" ")[1];
    try{
        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const { userId } = payload;
        req.user = userId;
        next();
    }catch(error){
        res.status(401).json({message:error.message});
    }
}

module.exports = authenticateToken;