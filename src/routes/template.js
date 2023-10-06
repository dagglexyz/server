const {
	createTemplate,
	getTemplates,
	getUserTemplates,
	deleteTemplate,
	cloneTemplate,
} = require("../controllers/template");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createTemplate);

router.get("/", auth, getUserTemplates);

router.get("/search", getTemplates);

router.post("/clone", auth, cloneTemplate);

router.delete("/:id", auth, deleteTemplate);

module.exports = router;
