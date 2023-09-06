const { Job } = require("../models/job");

WebSocket = require("ws");
const ws = new WebSocket(
	"ws://bootstrap.production.bacalhau.org:1234/requester/websocket/events"
);
ws.on("error", console.error);
ws.on("open", function open() {
	ws.send("Websocket connection opened!");
});

ws.on("message", async (data) => {
	data = JSON.parse(data.toString());
	let nD = {
		job_id: data.JobID,
		event_name: data.EventName,
		client_id: data.ClientID,
		source_node_id: data.SourceNodeID,
		source_node_id: data.TargetNodeID,
		execution_id: data.ExecutionID,
	};
	await Job.findOneAndUpdate(
		nD,
		{
			event_time: data.EventTime,
			published_result: data.PublishedResult,
			...nD,
		},
		{
			upsert: true,
		}
	);
});
