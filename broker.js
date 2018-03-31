const net = require('net');
const server = net.createServer();
const { port, host } = require('./config');
const crypto = require('crypto');

let subscribers = {};

const stats = () => {
	Object.keys(subscribers).forEach(channel => {
		console.log(`${ channel } has ${ subscribers[channel].length } subs`);
	});
};

const broadcast = (channel, msg) => {
	if (subscribers[channel]) {
		subscribers[channel].forEach(socket => {
			socket.write(JSON.stringify({
				channel, msg
			}));
		});
	}
};

const addSubscriber = (channel, socket) => {
	if (!subscribers[channel]) {
		subscribers[channel] = [];
	}
	subscribers[channel].push(socket);
	stats();
};

const removeSubscriber = ({ id }) => {
	Object.keys(subscribers).forEach(channel => {
		subscribers[channel] = subscribers[channel].filter(socket => socket.id !== id);
	});
	stats();
}

server
	.on('connection', socket => {
		socket.id = crypto.randomBytes(4).toString('hex');

		socket
			.on('end', () => {
				removeSubscriber(socket);
			})
			.on('data', chunk => {
				const { action, channel, msg } = JSON.parse(chunk);

				if (action === 'pub') {
					broadcast(channel, msg);

				} else if (action === 'sub') {
					addSubscriber(channel, socket);

				} else {
					console.error('invalid payload to server');
				}
			});
	})
	.listen(port, host, () => {
		console.log('broker is running');
	});
