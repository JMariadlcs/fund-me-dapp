/**  Script used to execute unit testing
*    To execute all the test: yarn hardhat test
*    To execute a single test (eg.1st test): yarn hardhat test --grep "sets the aggregator"
*    To see coverage: yarn hardhat coverage
*/

const { assert, expect} = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator
    const sendValue = ethers.utils.parseEther("1") // 1 Ether
    beforeEach(async function() {
        // Deploy FundMe.sol using Hardhat-deploy
        //const accounts = await ethers.getSigners();
        //const accountZero = accounts[0]

        deployer = (await getNamedAccounts()).deployer // get Deployer
        await deployments.fixture(["all"]) // Deploy everything with "all" tags
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
    })

    // test constructor
    describe("constructor", async function() {
        // First test -> Assert.equal
        it("sets the aggregator addresses correctly", async function () {
            const response = await fundMe.getPriceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    // test fund() function
    describe("fund", async function() {
        // Second test -> Waffle expect
        it("fails if not enough ETH is sent", async function() {
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")
        })
        // Third test -> also inside fund function
        it("updated the amount funded value sent", async function() {
            await fundMe.fund({value: sendValue})
            const response = await fundMe.getAddressToAmountFunded(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })
        // Fourth test -> add funder to array
        it("Add funder to array of funders", async function() {
            await fundMe.fund({value: sendValue})
            const funder = await fundMe.getFunder(0)
            assert.equal(funder, deployer)
        })
    })

    // test withdraw() function
    describe("withdraw", async function() {
        beforeEach(async function() { // Send some ETH before each time
            await fundMe.fund({ value: sendValue })
        })

        it("withdraw ETH from a single founder", async function() {
            // Arrange -> set up
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer)

            // Act -> withdraw
            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            const { gasUsed, effectiveGasPrice } = transactionReceipt // pull out objects inside transactionReceipt
            const gasCost = gasUsed.mul(effectiveGasPrice) // use .mul() to work with bigNumer type 

            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
            const endingeployerBalance = await fundMe.provider.getBalance(deployer)

            // Assert -> compare balances
            assert.equal(endingFundMeBalance, 0)
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingeployerBalance.add(gasCost).toString()) // use .add() to work with bigNumber type || rest gasCost
        })

        it("allow us to withdraw with multiple funders", async function () {
            // Arrange
            const accounts = await ethers.getSigners()
            for(let i = 1; i < 6; i++) { // Connect contract with different accounts (not only deployer) -> to allow execute functions 
                const fundMeConnectedContract = await fundMe.connect(accounts[i])
                await fundMeConnectedContract.fund({ value: sendValue })
            }
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer)

            // Act
            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            const { gasUsed, effectiveGasPrice } = transactionReceipt 
            const gasCost = gasUsed.mul(effectiveGasPrice) 

            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
            const endingeployerBalance = await fundMe.provider.getBalance(deployer)

            // Assert -> compare balances
            assert.equal(endingFundMeBalance, 0)
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingeployerBalance.add(gasCost).toString())

            // Make sure that funders array is now reset propertly
            await expect(fundMe.getFunder(0)).to.be.reverted
            for (i = 1; i < 6; i++) {
                assert.equal(await fundMe.getAddressToAmountFunded(accounts[i].address), 0)
            }
        })

        it("only allows owner to withdraw", async function() {
            const accounts = await ethers.getSigners()
            const attacker = accounts[1] // account that is not owner
            const attackerConnectedContract = await fundMe.connect(attacker)
            await expect(attackerConnectedContract.withdraw()).to.be.revertedWith("FundMe__NotOwner")
        })
    })
})