/**  Script used to execute integrated testing -> assume we are in a testnet
*    ----- LAST STEP BEFORE MAINNET -----
*    To execute all the test: yarn hardhat test --network rinkeby
*    To execute a single test (eg.1st test): yarn hardhat test --grep "allow people to fund and withdraw" --network rinkeby
*    To see coverage: yarn hardhat coverage
*/

const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

// check if we are in a testnet
developmentChains.includes(network.name) ? describe.skip :
describe("FundMe", async function () {
    let fundMe
    let deployer
    const sendValue = ethers.utils.parseEther("1")
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        fundMe = await ethers.getContract("FundMe", deployer)
    })

    it("allow people to fund and withdraw", async function () {
        await fundMe.fund({ value: sendValue })
        await fundMe.withdraw()
        const endingBalance = await fundMe.provider.getBalance(fundMe.address)
        assert.equal(endingBalance.toString(), "0")
    })
})