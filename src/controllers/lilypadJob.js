const { LilypadJob } = require("../models/lilypadJob");
const { Web3 } = require("web3");
const web3 = new Web3(
	"wss://polygon-mumbai.g.alchemy.com/v2/vkwriS_TfYwbocQ4DEbA1zSyq80MN-kT"
);
const JOB_COMPLETE_TOPIC = web3.utils.keccak256(
	"JobCompleted(uint256,address,uint8,string)"
);
const JOB_CANCELED_TOPIC = web3.utils.keccak256(
	"JobCanceled(uint256,address,string)"
);

async function createJob(req, res) {
	try {
		const job = await new LilypadJob({
			job_id: req.body.job_id,
			user: req.user._id,
			tx_hash: req.body.tx_hash,
		}).save();

		res.send(job);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function getJobs(req, res) {
	try {
		const jobs = await LilypadJob.find({ user: req.user._id }).sort({
			createdAt: -1,
		});
		res.send(jobs);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message, error: error });
	}
}

async function getJob(req, res) {
	try {
		const job = await LilypadJob.findById(req.params.id);
		if (!job) return res.status(404).send({ message: "Invalid job id." });

		const response = await web3.eth.getPastLogs({
			address: "0xdD6a7F72d68fbe6F347ff4c20EC0fa7eC9abB40B",
			fromBlock: 39996840,
			topics: [
				[JOB_COMPLETE_TOPIC, JOB_CANCELED_TOPIC],
				web3.eth.abi.encodeParameter("uint256", job.job_id),
			],
		});
		console.log(response[0].data);
		if (response.length > 0) {
			const data = response[0].data;
			const decoded = web3.eth.abi.decodeLog(
				[
					{
						type: "uint256",
						name: "jobId",
						indexed: true,
					},
					{
						type: "address",
						name: "from",
					},
					{
						type: "uint8",
						name: "LilypadResultType",
					},
					{
						type: "string",
						name: "data",
					},
				],
				data,
				[JOB_COMPLETE_TOPIC, JOB_CANCELED_TOPIC]
			);
			job.result = decoded.data;
			await job.save();
		}
		res.send(job);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message, error: error });
	}
}

module.exports = {
	createJob,
	getJobs,
	getJob,
};
