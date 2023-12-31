const router = require("express").Router();
const upload = require("./upload");
const user = require("./user");
const bacalhau = require("./bacalhau");
const jobs = require("./jobs");
const lilypadJobs = require("./lilypadJob");
const files = require("./files");
const template = require("./template");
const saturn = require("./saturn");

router.use("/upload", upload);
router.use("/user", user);
router.use("/bacalhau", bacalhau);
router.use("/jobs", jobs);
router.use("/lilypad", lilypadJobs);
router.use("/files", files);
router.use("/template", template);
router.use("/saturn", saturn);

module.exports = { routes: router };
