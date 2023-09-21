// https://stackoverflow.com/a/22907134
const https = require("https");
var fs = require("fs");

var download = function (url, dest) {
	return new Promise((res, rej) => {
		var file = fs.createWriteStream(dest);
		https
			.get(url, function (response) {
				response.pipe(file);
				file.on("finish", function () {
					file.close(); // close() is async, call cb after close completes.
					res(true);
				});
			})
			.on("error", function (err) {
				// Handle errors
				fs.unlink(dest); // Delete the file async. (But we don't check the result)
				rej(err.message);
			});
	});
};

module.exports = { download };
