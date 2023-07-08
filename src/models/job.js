const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        job_id: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["file-upload", "script-python", "script-nodejs", "train-tensorflow", "removebg"]
        },
        status: {
            type: String,
            default: "Created",
            required: true,
        },
        result: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Job = new mongoose.model("Job", JobSchema);

module.exports = { Job };
