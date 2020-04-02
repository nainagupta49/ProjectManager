const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider( 
	'suspect region satisfy city ocean clip brave truth harsh twist price apart', 'https://rinkeby.infura.io/v3/cc7e5fee2aa5433fb79275e7a116df2e' );

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(interface))
	               .deploy({ data: bytecode })
	               .send({ gas: '1000000', from: accounts[0] });
	
	console.log('Contract deployed to', result.options.address);
};

deploy();
