// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile.js");

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ["Hi There!"] })
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
    it("Deploys a contract", async () => {
        assert.ok(inbox.options.address);
    });
    it("Has a default message", async () => {
        const message = await inbox.methods.message().call();
    });
    it("Can change the message", async () => {
        await inbox.methods.setMessage("bye").send({
            from: accounts[0],
        });
        const message = await inbox.methods.message().call();
        assert.equal(message, "bye");
    });
});
