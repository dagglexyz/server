const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            default: " ",
            required: true,
        },
        description: {
            type: String, default: " ", required: true,
        },
        file: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['dataset', 'model', 'file']
        },
        job_id: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const File = new mongoose.model("File", FileSchema);

module.exports = { File };
