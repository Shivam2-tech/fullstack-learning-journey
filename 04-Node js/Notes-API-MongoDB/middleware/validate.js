function validate(req, res, next) {

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            msg: "Title and Content are required"
        });
    }

    if (
        typeof title !== "string" ||
        typeof content !== "string"
    ) {
        return res.status(400).json({
            msg: "Title and Content must be strings"
        });
    }

    next();
}

function validatePatch(req, res, next) {

    const { title, content } = req.body;

    if (
        title !== undefined &&
        typeof title !== "string"
    ) {
        return res.status(400).json({
            msg: "Title must be a string"
        });
    }

    if (
        content !== undefined &&
        typeof content !== "string"
    ) {
        return res.status(400).json({
            msg: "Content must be a string"
        });
    }

    next();
}

module.exports = {
    validate,
    validatePatch
};