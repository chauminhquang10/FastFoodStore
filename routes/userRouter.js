const router = require("express").Router();

const userController = require("../controllers/userController");

const authentication = require("../middlewares/authentication");

router.post("/register", userController.register);

router.get("/refresh_token", userController.refreshToken);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.get("/information", authentication, userController.getUser);

router.patch("/add_cart", authentication, userController.addcart);

router.get("/history", authentication, userController.history);

module.exports = router;
