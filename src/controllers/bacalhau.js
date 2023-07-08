const { default: axios } = require("axios");
const { Job } = require("../models/job");

async function submitJob(req, res) {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/bacalhau/submit`, req.body,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        const data = response.data;
        // Upload job id to polybase
        const job = await Job({
            job_id: data._job._metadata._id,
            user: req.user._id,
            type: req.body.type,
        }).save();

        res.send(job);
    } catch (error) {
        res.status(500).send({ message: error.message, error: error });
    }
}


module.exports = { submitJob }