const jwt = require("jsonwebtoken");

function auth(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json("No Token Provided");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(404).json({
                msg: "Invalid Credentials"
            });
        }

        req.user = decoded;
    } catch (err) {
        console.error(err);
    }
    next();
}

module.exports = auth;