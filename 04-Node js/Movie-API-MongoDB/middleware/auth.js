const jwt=require("jsonwebtoken");

function auth(req,res,next){
    const authHeader=req.headers.authorization;

    if(!authHeader){
        return res.status(404).json({
            msg:"Not Found"
        });
    }

    const token=authHeader.split(" ")[1];

try{
    const decoded= jwt.verify(token,process.env.JWT_SECRET);

    req.user=decoded;

    next();
}
catch(err){
    console.error(err);
}
};

module.exports=auth;