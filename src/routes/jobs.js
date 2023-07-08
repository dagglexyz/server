const { getJobs, getJobStatus } = require("../controllers/jobs");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", auth, getJobs);

router.get("/state/:id", getJobStatus);

module.exports = router;
