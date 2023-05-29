const Url = require("../models/url.model.js");

const validateUrlExistence = (req, res, next) => {
    Url.getOriginalUrl(req.body.originalUrl, (err, result) => {
        if (err) {
            return res.status(500).send({
                message: "Error retrieving URL with id " + req.params.id + " not exists"
            });
        }
        req.url = result;
        next();
    });
}


module.exports = {
    validateUrlExistence
};