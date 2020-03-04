const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode } = require('../compile');

const provider = ganache.provider();
var web3 = new Web3(provider);

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi There';

beforeEach( async () => {
    // Get a list of Free Accounts
    accounts = await web3.eth.getAccounts()
    
    // Use those account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
        .send({from: accounts[0], gas: '1000000'});

    inbox.setProvider(provider);
});

describe('Inbox',() => {
    it('deploys a contract', () => {
        console.log(inbox.options.address);
        assert.ok(inbox.options.address);
    });
    it('Initial message set', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message,INITIAL_MESSAGE);
    });
    it('SetMessage function working', async () => {
        await inbox.methods.setMessage('Bye There').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'Bye There');
    })
});