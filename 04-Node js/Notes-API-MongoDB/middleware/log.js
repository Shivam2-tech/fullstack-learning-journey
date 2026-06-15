function log(req, res, next) {
    try {
        console.log(req.url);
    } catch (err) {
        console.error(err);
    }
    next();
}

module.exports=log;