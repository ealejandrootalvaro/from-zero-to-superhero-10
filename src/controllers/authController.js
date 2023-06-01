const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  // Tarea Clase 8. Leer README.md
  const { email } = req.body; 

  // Verificar usuario y contrasena en base datos.  
  let token = jwt.sign(
    { email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  )

  res
        .status(200)
        .json({
        success: true,
        data: {
            token,
        },
        });

};

exports.restrictedView = (_, res) => {
  // Tarea Clase 8. Leer README.md
  res.status(200)
    .send("Confidential View")
}