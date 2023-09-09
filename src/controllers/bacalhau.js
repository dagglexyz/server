const { Job } = require("../models/job");
const { submit, getClientId } = require("@daggle/bacalhau-js");
const {
	Payload,
	Spec,
	PublisherSpec,
	StorageSpec,
	JobSpecDocker,
	Deal,
} = require("@daggle/bacalhau-js/models");

async function submitJob(req, res) {
	try {
		if (!req.body.jobspecdocker || !req.body.storagespec) {
			return res.status(500).send({ message: "Please send valid body." });
		}

		let inputs = [];
		req.body.storagespec.forEach((s) => {
			inputs.push(new StorageSpec(s));
		});

		const payload = new Payload({
			ClientID: getClientId(),
			spec: new Spec({
				engine: "Docker",
				verifier: "Noop",
				publisher_spec: new PublisherSpec({ type: "Estuary" }),
				inputs: inputs,
				docker: new JobSpecDocker(req.body.jobspecdocker),
				timeout: 1800,
				outputs: [
					new StorageSpec({
						StorageSource: "IPFS",
						name: "outputs",
						path: "/outputs",
					}),
				],
				deal: new Deal(),
				do_not_track: false,
			}),
		});

		const response = await submit(payload);
		// Upload job id to polybase
		const job = await Job({
			job_id: response.job.Metadata.ID,
			user: req.user._id,
			type: req.body.type,
			status: "Created",
			client_id: response.job.Metadata.ClientID,
			source_node_id: response.job.Metadata.Requester.RequesterNodeID,
			event_name: " ",
			execution_id: " ",
			target_node_id: " ",
		}).save();

		res.send(job);
	} catch (error) {
		res.status(500).send({ message: error.message, error: error });
	}
}

async function createDockerJob(req, res) {
	try {
		if (!req.body.jobspecdocker) {
			return res.status(500).send({ message: "Please send valid body." });
		}

		let inputs = [];
		req.body.inputs.forEach((s) => {
			inputs.push(new StorageSpec(s));
		});

		const payload = new Payload({
			ClientID: getClientId(),
			spec: new Spec({
				engine: "Docker",
				verifier: "Noop",
				publisher_spec: new PublisherSpec({ type: "Estuary" }),
				inputs: inputs,
				docker: new JobSpecDocker(req.body.jobspecdocker),
				timeout: 1800,
				outputs: [
					new StorageSpec({
						StorageSource: "IPFS",
						name: "outputs",
						path: "/outputs",
					}),
				],
				deal: new Deal(),
				do_not_track: false,
			}),
		});

		const response = await submit(payload);
		// Upload job id to polybase
		const job = await Job({
			job_id: response.job.Metadata.ID,
			user: req.user._id,
			type: "docker",
			status: "Created",
			client_id: response.job.Metadata.ClientID,
			source_node_id: response.job.Metadata.Requester.RequesterNodeID,
			event_name: " ",
			execution_id: " ",
			target_node_id: " ",
		}).save();

		res.send(job);
	} catch (error) {
		res.status(500).send({ message: error.message, error: error });
	}
}

module.exports = { submitJob, createDockerJob };
