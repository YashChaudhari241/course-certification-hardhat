const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { student} = await getNamedAccounts()

    const certifyContract = await ethers.getContract("Certify", student)
    console.log(`Got contract Rental at ${certifyContract.address}`)
    const transactionResponse = await certifyContract.getCertificate(student,0)
    console.log(transactionResponse)
    console.log("done: got certificate")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
