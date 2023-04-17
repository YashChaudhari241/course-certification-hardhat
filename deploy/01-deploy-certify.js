const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
// const { verify } = require("../utils/verify")
require("dotenv").config()
const fs = require("fs")
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { owner } = await getNamedAccounts()
    const chainId = network.config.chainId
    log("----------------------------------------------------")
    log("Deploying Certify and waiting for confirmations...")
    const certifyContract = await deploy("Certify", {
        from: owner,
        args: [owner],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`Certify deployed at ${certifyContract.address}`)
    json = JSON.stringify({ deployed_at: certifyContract.address })
    fs.writeFile("../course-certification/hardhat.json", json, "utf8", function () {
        log("wrote config")
    })
    // if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     await verify(fundMe.address, [ethUsdPriceFeedAddress])
    // }
}

module.exports.tags = ["all", "certify"]
