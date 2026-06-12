function use(req,res,next) {
        console.log(req.url);
        next();
}

module.exports=use;