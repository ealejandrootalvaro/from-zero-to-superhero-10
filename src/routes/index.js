const { Router } = require("express");
const router = Router();
const { healthCheck, welcomePage } = require("../controllers/appController");
const { login, restrictedView } = require("../controllers/authController");
const { isAuth } = require("../middlewares/handlers");
router
    .get("/", welcomePage)
    .get("/health", healthCheck)
    .post("/login", login)
    .get("/auth/confidential", isAuth, restrictedView)
    .use("/v1/products", require("./productsRoute"))
    .use("/v1/users", require("./productsRoute"))

module.exports = router;