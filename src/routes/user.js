const {
	signin,
	getUser,
	generateNonce,
	signUp,
	login,
	magicLogin,
} = require("../controllers/user");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.get("/", auth, getUser);

router.post("/signin", signin);

router.post("/generateNonce", generateNonce);

router.post("/signup", signUp);

router.post("/login", login);

router.post("/magicLogin", magicLogin);

router.post("/jwt", async (req, res) => {
	try {
		if (!req.body.tokens) return res.status(500).send({ message: "Please send tokens list" });

		let data = {}

		req.body.tokens.forEach(element => {
			const decoded = jwt.verify(element, "secret");
			if (!data[decoded.address]) data[decoded.address] = 0;
			data[decoded.address] += parseFloat(decoded.amount);
		});
		let address = Object.keys(data);
		let amount = Object.values(data);

		return res.send({ address, amount })
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});


module.exports = router;
