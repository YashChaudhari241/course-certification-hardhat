const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { owner, issuer} = await getNamedAccounts()

    const certifyContract = await ethers.getContract("Certify", owner)
    console.log(`Got contract Rental at ${certifyContract.address}`)
    const transactionResponse = await certifyContract.addIssuer(issuer)
    console.log(transactionResponse)
    await transactionResponse.wait(1)
    console.log("done: added issuer")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
