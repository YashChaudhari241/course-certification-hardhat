const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { issuer, student } = await getNamedAccounts()

    const certifyContract = await ethers.getContract("Certify", issuer)
    console.log(`Got contract Rental at ${certifyContract.address}`)
    const transactionResponse = await certifyContract.issueCertificate(
        {
            issuedTo: student,
            issuedBy: issuer,
            issuedAt: Date.now(),
            encryptedData: "as23nlkP1"
        }
    )
    console.log(transactionResponse)
    await transactionResponse.wait(1)
    console.log("done: issued certificate")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
