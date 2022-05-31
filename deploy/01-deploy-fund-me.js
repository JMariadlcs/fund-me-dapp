const { networkConfig } = require("../helper-hardhat-config") // to manage different chains
const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Use chainId to select different arguments depending on the chain we are deploying -> MULTICHAIN 
    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    if (chainId == 31337) { // hardhat local network -> In this Network it does not exist a priceAggregator so we need to deploy our MockV3Aggregator in this network to use it
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else { // get corresponding address depending on deployed network
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // When deploying on localhost or hardhat network we want to use Mocks
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [],
        logs: true,
    })
}