const {
	createTemplate,
	getTemplates,
	deleteTemplate,
	cloneTemplate,
} = require("../controllers/template");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createTemplate);

router.get("/", auth, getTemplates);

router.post("/clone/:id", auth, cloneTemplate);

router.delete("/:id", auth, deleteTemplate);

module.exports = router;
