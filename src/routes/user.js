const {
	signin,
	getUser,
	generateNonce,
	signUp,
	login,
	magicLogin,
} = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", auth, getUser);

router.post("/signin", signin);

router.post("/generateNonce", generateNonce);

router.post("/signup", signUp);

router.post("/login", login);

router.post("/magicLogin", magicLogin);

module.exports = router;
