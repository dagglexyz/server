const {
	createTemplate,
	getTemplates,
	deleteTemplate,
} = require("../controllers/template");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createTemplate);

router.get("/", auth, getTemplates);

router.delete("/:id", auth, deleteTemplate);

module.exports = router;
