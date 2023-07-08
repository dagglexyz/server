const { submitJob } = require("../controllers/bacalhau");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/submit", auth, submitJob);

module.exports = router;
