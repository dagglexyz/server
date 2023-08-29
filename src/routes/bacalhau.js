const { submitJob, createDockerJob } = require("../controllers/bacalhau");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/submit", auth, submitJob);

router.post("/submit/docker", auth, createDockerJob);

module.exports = router;
