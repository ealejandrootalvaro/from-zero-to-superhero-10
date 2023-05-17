const jwt = require("jsonwebtoken");

exports.login = (req, res) => {

    let { email } = req.body;

    token = jwt.sign(
        { email: email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    );

    res
    .status(200)
    .json({
      success: true,
      data: {
        token: token,
      },
    });
};

exports.restrictedView = (_, res) => {

    res.status(200)
    .send("Confidential View")

}