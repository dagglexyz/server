const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			required: true,
		},
		payload: {
			type: Object,
			required: true,
		},
		name: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Template = new mongoose.model("Template", TemplateSchema);

module.exports = { Template };
