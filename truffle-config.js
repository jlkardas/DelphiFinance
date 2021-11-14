const path = require("path");

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
		develop: {
			host: "127.0.0.1",
			port: 7545, // tells truffle what port to run on
			network_id: "5777",
			gas: 4698712,
			gasPrice: 25000000000,
		},
	},
};
