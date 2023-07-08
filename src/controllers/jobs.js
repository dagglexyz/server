const { File } = require("../models/file")
const { Job } = require("../models/job")
const { default: axios } = require("axios")

async function getJobs(req, res) {
    try {
        let jobs = []
        if (req.query.query !== "undefined" && req.query.query !== "") {
            jobs = await Job.find({ user: req.user._id, job_id: req.query.query }).sort({ createdAt: "desc" })
        } else
            jobs = await Job.find({ user: req.user._id }).sort({ createdAt: "desc" })
        res.send(jobs);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

async function getJobStatus(req, res) {
    try {
        const job = await Job.findById(req.params.id)
        const response = await axios.get(`http://127.0.0.1:8000/bacalhau/state/${job.job_id}`)
        const data = response.data._state

        const state = data._state;
        job.status = state;
        if (state === "Completed") {
            const cidObj = data._executions.filter(e => e._published_results._cid)[0]
            const cid = cidObj._published_results._cid;
            job.result = cid;
            if (job.type === "train-tensorflow") {
                await new File({
                    user: req.user._id,
                    file: cid,
                    type: "model",
                    job_id: job.job_id,
                }).save()
            }
        }
        await job.save()
        res.send(job);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message, error: error });
    }
}

module.exports = {
    getJobs,
    getJobStatus
}