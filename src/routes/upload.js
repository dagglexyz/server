const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const { SpheronClient, ProtocolEnum } = require("@spheron/storage");
const auth = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const { File } = require("../models/file");

const token = process.env.SPHERON_TOKEN;
const client = new SpheronClient({ token });

router.post(
	"/dataset",
	auth,
	upload.array("file"),
	async (req, res) => {
		try {
			if (req.files && req.files.length === 0) {
				return res.send({ message: "Please upload a file." });
			}
			const files = req.files;
			const name = req.body.name;
			const description = req.body.description;
			const stableDiffusionEnabled =
				req.body.stableDiffusionEnabled === "false" ? false : true;

			// Upload to Spheron
			let filePath;
			if (stableDiffusionEnabled) {
				filePath = path.join(__dirname, "../../uploads/");
			} else {
				filePath = path.join(__dirname, "../../uploads/" + files[0].filename);
			}
			let currentlyUploaded = 0;
			const response = await client.upload(filePath, {
				protocol: ProtocolEnum.IPFS,
				name: "daggle",
				onUploadInitiated: (uploadId) => {
					console.log(`Upload with id ${uploadId} started...`);
				},
				onChunkUploaded: (uploadedSize, totalSize) => {
					currentlyUploaded += uploadedSize;
					console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
				},
			});

			await new File({
				user: req.user._id,
				name,
				description,
				file: response.protocolLink,
				size: currentlyUploaded,
				type: "dataset"
			}).save()

			// Delete Files
			for (const file of files) {
				fs.rmSync(`${file.destination}/${file.filename}`);
			}

			res.send(response);
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: error.message });
		}
	},
	(err, req, res, next) => {
		res.status(400).send({ error: err.message });
	}
);

router.post(
	"/file",
	auth,
	upload.single("file"),
	async (req, res) => {
		try {
			if (!req.file) {
				return res.status(500).send({ message: "Please upload a file." });
			}
			const file = req.file;

			// Upload to Spheron
			let filePath;
			filePath = path.join(__dirname, "../../uploads/" + file.filename);
			let currentlyUploaded = 0;
			const response = await client.upload(filePath, {
				protocol: ProtocolEnum.IPFS,
				name: "daggle",
				onUploadInitiated: (uploadId) => {
					console.log(`Upload with id ${uploadId} started...`);
				},
				onChunkUploaded: (uploadedSize, totalSize) => {
					currentlyUploaded += uploadedSize;
					console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
				},
			});

			await new File({
				user: req.user._id,
				name: file.filename,
				file: response.protocolLink,
				size: currentlyUploaded,
				type: "file",
			}).save()

			// Delete Files
			fs.rmSync(`${file.destination}/${file.filename}`);

			res.send({ ...response, file });
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
	(err, req, res, next) => {
		console.log(err);
		res.status(400).send({ error: err.message });
	}
);

module.exports = router;
