const { unpackAndArchive } = require("../utils/car");
const router = require("express").Router();
const fs = require("fs");
const { download } = require("../utils/download");

router.get("/:cid", async (req, res) => {
	try {
		// Download from Saturn
		let dest = req.params.cid + ".car";
		await download(`https://saturn.ms/ipfs/${req.params.cid}`, dest);
		// Unpack and zip the file
		let zipPath = await unpackAndArchive(dest);
		// Delete the downloaded car file
		fs.unlinkSync(dest, { recursive: true, force: true });
		// Send it to client
		var fileReadStream = fs.createReadStream(zipPath);
		res.setHeader("Content-disposition", "attachment; filename=" + zipPath);
		fileReadStream.pipe(res).on("finish", () => {
			// Remove the zipped file
			fs.rmSync(zipPath, { recursive: true, force: true });
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

module.exports = router;
