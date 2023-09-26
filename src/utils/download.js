// https://stackoverflow.com/a/22907134
const https = require("https");
var fs = require("fs");

var download = function (url, dest) {
	try {
		return new Promise((res, rej) => {
			var file = fs.createWriteStream(dest);
			https
				.get(url, function (response) {
					response.pipe(file);
					file
						.on("finish", function () {
							file.close(); // close() is async, call cb after close completes.
							res(true);
						})
						.on("error", (_) => {
							console.log("errored");
						});
				})
				.on("error", function (err) {
					// Handle errors
					fs.rmSync(dest, { recursive: true, force: true });
					rej(err.message);
				});
		});
	} catch (err) {
		console.log(err.message);
		fs.rmSync(dest, { recursive: true, force: true });
		rej(false);
	}
};

module.exports = { download };
