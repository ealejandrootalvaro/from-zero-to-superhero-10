const jwt = require("jsonwebtoken");

exports.errorHandler = (err, _, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}

exports.notFoundHandler = (req, res, _) => {
    res.status(404).send(`Page ${req.path} does not exist in this cool server`);
}

exports.isAuth = (req, res, next) => {
    // Tarea Clase 8. Leer README.md
}