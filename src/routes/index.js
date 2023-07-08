const router = require("express").Router();
const upload = require("./upload");
const user = require("./user");
const bacalhau = require("./bacalhau");
const jobs = require("./jobs");
const files = require("./files");

router.use("/upload", upload);
router.use("/user", user);
router.use("/bacalhau", bacalhau);
router.use("/jobs", jobs);
router.use("/files", files);

module.exports = { routes: router };
