const jwt = require("jsonwebtoken");

async function identifyUser(req,res, next){
    // identifying the user :-
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    let decoded = null;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token / User not authaorized"
        })
    }
    // console.log(decoded);

    req.user = decoded;
    // console.log(req.user.id);

    next();
}

module.exports = identifyUser;