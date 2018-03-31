const net = require('net');

function publish(channel, msg) {
	this.write(JSON.stringify({
		channel,
		msg,
		action: 'pub'
	}));
};

function subscribe(channels) {
	channels.forEach(channel => {
		this.write(JSON.stringify({
			channel,
			action: 'sub'
		}));
	}, this);
};

module.exports = {
	connect: function(port) {
		return new Promise((resolve, reject) => {
			let connection = net.connect(port);

			connection.setNoDelay(false); // https://nodejs.org/api/net.html#net_socket_setnodelay_nodelay

			connection.publish = publish.bind(connection);
			connection.subscribe = subscribe.bind(connection);

			connection
				.on('end', () => process.exit(0))
				.on('connect', () => resolve(connection));
		});
	}
};
