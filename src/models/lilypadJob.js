const mongoose = require("mongoose");

const LilypadJobSchema = new mongoose.Schema(
	{
		job_id: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		tx_hash: {
			type: String,
		},
		result: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const LilypadJob = new mongoose.model("LilypadJob", LilypadJobSchema);

module.exports = { LilypadJob };
