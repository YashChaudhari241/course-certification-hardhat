const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { student} = await getNamedAccounts()

    const certifyContract = await ethers.getContract("Certify", student)
    console.log(`Got contract Rental at ${certifyContract.address}`)
    const transactionResponse = await certifyContract.getAllCertificates(student)
    console.log(transactionResponse)
    console.log("done: got all certificates")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
