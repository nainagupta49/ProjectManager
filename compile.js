const path = require('path');
const fs = require('fs');
const solc = require('solc');

const SourcePath = path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(SourcePath, 'utf8');

//console.log(solc.compile(source,1));
module.exports = solc.compile(source,1).contracts[':Inbox'];