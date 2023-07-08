const { getJobs } = require("../controllers/jobs");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", auth, getJobs);

// router.get("/:job_id", getJob);

module.exports = router;
