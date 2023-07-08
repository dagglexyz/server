const mongoose = require("mongoose");
const url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/daggle";

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
	mongoose.connection.db
		.collection("users")
		.createIndex({ email: 1 }, { sparse: true, unique: true });
	console.log("Connected to the Database.");
});
