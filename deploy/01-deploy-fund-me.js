
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Use chainId to select different arguments depending on the chain we are deploying -> MULTICHAIN 
    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // When deploying on localhost or hardhat network we want to use Mocks
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [],
        logs: true,
    })
}