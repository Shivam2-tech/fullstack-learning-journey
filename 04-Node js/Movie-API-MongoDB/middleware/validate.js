function validate(req,res,next){
    const body=req.body || {};
    console.log(req.body);

    if (!body.title || !body.content || !body.year) {
        return res.status(400).json({
            msg: "All Fields Required"
        });
    }
    if (body.rating < 1 || body.rating > 10) {
        return res.status(400).json({
            msg: "Rating must be 1-10"
        });
    }
    if (typeof body.year !== "number") {
        return res.status(400).json({
            msg: "Year must be a number"
        });
    }
    next();
}
function validatePatch(req,res,next){
    const body=req.body;

    if (body.rating) {
            if (body.rating < 1 || body.rating > 10) {
                return res.status(400).json({
                    msg: "Rating must be 1-10"
                });
            }
        }
        if (body.year) {
            if (typeof body.year !== "number") {
                return res.status(400).json({
                    msg: "Not a number"
                });
            }
        }
        next();
}
module.exports={validate,validatePatch};