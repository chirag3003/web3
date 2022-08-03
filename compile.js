// compile code will go here
const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.join(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":Inbox"];
