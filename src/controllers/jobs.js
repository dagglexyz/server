const { Job } = require("../models/job")

async function getJobs(req, res) {
    try {
        let jobs = []
        if (req.query.query !== "undefined" && req.query.query !== "") {
            jobs = await Job.find({ user: req.user._id, job_id: req.query.query })
        } else
            jobs = await Job.find({ user: req.user._id })
        res.send(jobs);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    getJobs
}