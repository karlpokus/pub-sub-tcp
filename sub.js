const client = require('./lib/client');
const { port } = require('./config');
const channels = process.argv.slice(2);

if (!channels.length) {
	process.exit(1);
}

client.connect(port)
	.then(socket => {
		console.log(`subscribing to ${ channels.join(' ') }`);

		socket.on('data', chunk => {
			const { channel, msg } = JSON.parse(chunk);

			console.log(`${ msg } from ${ channel }`);
		});

		socket.subscribe(channels);
	});
