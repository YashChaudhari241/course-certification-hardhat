require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter")
require("dotenv").config()
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
    },
    gasReporter: {
        enabled: true,
    },
    namedAccounts: {
      owner: {
          default: 0, 
          1: 0 },
      authority: {
          default: 2,
      },
      issuer: {
          default: 3,
      },
      student: {
          default: 4,
      },
  },
  mocha: {
    timeout: 500000,
},
};
