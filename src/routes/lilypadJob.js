const { createJob, getJob, getJobs } = require("../controllers/lilypadJob");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, createJob);

router.get("/", auth, getJobs);

router.get("/:id", getJob);

module.exports = router;
