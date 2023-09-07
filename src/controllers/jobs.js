const { File } = require("../models/file")
const { Job } = require("../models/job")
const { states } = require("@daggle/bacalhau-js")

async function getJobs(req, res) {
    try {
        let jobs = []
        if (req.user) {
            if (req.query.query !== "undefined" && req.query.query !== "") {
                jobs = await Job.find({
                    user: req.user._id,
                    job_id: req.query.query,
                }).sort({ createdAt: "desc" });
            } else
                jobs = await Job.find({ user: req.user._id }).sort({
                    createdAt: "desc",
                });
        } else {
            let queryOptions = []
            if(req.query.query) {
                queryOptions['$or'] = 
									[
										{ job_id: req.query.query },
										{ client_id: req.query.query },
									]
            }
            jobs = await Job.aggregate([
                {
                    $match: { ...queryOptions },
                },
                {
                    $group: {
                        _id: "$job_id",
                        job: { $first: "$$CURRENT" },
                    },
                },
                { $sort: { "job.createdAt": -1 } },
                { $limit: 20 },
            ]);
        }
        res.send(jobs);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

async function getJobEvents(req, res) {
	try {
        let jobs = await Job.aggregate([
            {
                $match: {
                    job_id: req.params.id,
                },
            },
        ]).sort({ createdAt: "desc" });
		res.send(jobs);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function getJobStatus(req, res) {
    try {
        const job = await Job.findById(req.params.id)
        const response = await states(job.job_id);
        const data = response.state

        const state = data.State;
        job.status = state;
        if (state === "Completed") {
            const cidObj = data.Executions.filter(
							(e) => e.PublishedResults.CID
						)[0];
            const cid = cidObj.PublishedResults.CID;
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
    getJobEvents,
    getJobStatus
}