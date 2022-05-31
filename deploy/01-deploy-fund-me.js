/* This Script is used to deploy FundMe.sol contract
    Deploy: 'yarn hardhat deploy --tags fundme --network networkname'
 */

const { networkConfig, developmentChains } = require("../helper-hardhat-config") // to manage different chains
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Use chainId to select different arguments depending on the chain we are deploying -> MULTICHAIN 
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    log("Deploying FundMe and waiting for confirmations...")
    if (chainId == 31337) { // hardhat local network -> In this Network it does not exist a priceAggregator so we need to deploy our MockV3Aggregator in this network to use it
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else { // get corresponding address depending on deployed network
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // When deploying on localhost or hardhat network we want to use Mocks
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
    })

    // If it is deployed on a real network -> verify our contract
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }

    log("--------------------------------")
}

module.exports.tags = ["all", "fundme"]