async function unpackAndArchive(carFilePath) {
	try {
		const car = await import("@daggle/car");
		const zipPath = await car.unpackAndArchive(carFilePath);

		return zipPath;
	} catch (error) {
		console.log(error.message);
	}
}

module.exports = { unpackAndArchive };
