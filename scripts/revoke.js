const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { issuer,student} = await getNamedAccounts()

    const certifyContract = await ethers.getContract("Certify", issuer)
    console.log(`Got contract Rental at ${certifyContract.address}`)
    const transactionResponse = await certifyContract.revokeCertificate(student,0)
    console.log(transactionResponse)
    await transactionResponse.wait(1)
    console.log("done: revoked certificate")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
