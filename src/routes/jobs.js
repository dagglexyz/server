const { getJobs, getJobStatus, getJobEvents } = require("../controllers/jobs");
const getUser = require("../middlewares/getUser");

const router = require("express").Router();

router.get("/", getUser, getJobs);

router.get("/events/:id", getJobEvents);

router.get("/state/:id", getJobStatus);

module.exports = router;
