async function unpackAndArchive(carFilePath) {
	try {
		const car = await import("@daggle/car");
		// TODO: Download file from saturn and delete once archived!
		const zipPath = await car.unpackAndArchive(carFilePath);

		return zipPath;
	} catch (error) {
		console.log(error.message);
	}
}

module.exports = { unpackAndArchive };
