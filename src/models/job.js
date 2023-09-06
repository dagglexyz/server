const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
	{
		job_id: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
		},
		type: {
			type: String,
			required: true,
			enum: [
				"file-upload",
				"script-python",
				"script-nodejs",
				"train-tensorflow",
				"removebg",
				"docker",
			],
			default: " ",
		},
		status: {
			type: String,
			default: " ",
			required: true,
		},
		result: {
			type: String,
		},
		// Indexer properties
		event_name: {
			type: String,
			required: true,
		},
		client_id: {
			type: String,
			required: true,
		},
		execution_id: {
			type: String,
			required: true,
		},
		source_node_id: {
			type: String,
			required: true,
		},
		target_node_id: {
			type: String,
			required: true,
		},
		event_time: {
			type: String,
		},
		published_result: {
			type: Object,
		},
	},
	{
		timestamps: true,
	}
);

const Job = new mongoose.model("Job", JobSchema);

module.exports = { Job };
