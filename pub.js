const client = require('./lib/client');
const { port } = require('./config');
const args = process.argv.slice(2);
const channelName = args[0];
const msg = args[1];
const publishInterval = args[2];

if (!args.length) {
	process.exit(1);
}

client.connect(port)
	.then(socket => {
		console.log(`${ channelName } is running`);

		setInterval(() => {
			socket.publish(channelName, msg);
		}, publishInterval);
	});
