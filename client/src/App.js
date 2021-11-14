import React, { Component } from "react";
import DelphiFactory from "./contracts/DelphiFactory.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
	state = { funds: [], web3: null, accounts: null, factory: null };

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts. (on metamask)
			const accounts = await web3.eth.getAccounts();
			console.log("accounts", accounts);

			this.setState({ web3, accounts }, () => {});
			/**
			 *
			 */
			// const { web3, accounts } = this.state;

			// get the factory contract instance
			const networkId = await web3.eth.net.getId();
			console.log("networkId", networkId);

			const deployedNetwork = DelphiFactory.networks[networkId];
			console.log("deployedNetwork", deployedNetwork);

			const factory = new web3.eth.Contract(DelphiFactory.abi, deployedNetwork && deployedNetwork.address);
			console.log("factory", factory);
			this.state.factory = factory;

			var allFunds = await factory.methods.getAllFunds().call();
			this.setState({ funds: allFunds });
			console.log("funds", this.state.funds);
		} catch (error) {
			// Catch any errors for any of the above operations.
			// alert(`Failed to load web3, accounts, or contract. Check console for details.`);
			console.error(error);
		}
	};

	initFund = async (token) => {
		var { funds, accounts, factory } = this.state;
		// create a new fund
		let randToken = Math.floor(Math.random() * (9999 - 0 + 1));
		var fund = await factory.methods.createFund(randToken).send({ from: accounts[0] });
		var fundAddress = fund.events.FundCreated.returnValues[0];
		console.log("fund", fundAddress);

		// save the fund address
		var allFunds = this.state.funds;
		allFunds.push(fundAddress);
		this.setState({ funds: allFunds });
	};

	generateFundData = () => {
		return this.state.funds.map((fund, i) => {
			return (
				<tr key={i}>
					<td>{fund}</td>
				</tr>
			);
		});
	};

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}

		return (
			<div className="App">
				<button onClick={this.initFund}>Create Fund</button>
				<table>
					<thead>
						<tr>
							<th colSpan="1">Liquidity Funds</th>
						</tr>
					</thead>
					<tbody>{this.generateFundData()}</tbody>
				</table>
			</div>
		);
	}
}

export default App;
