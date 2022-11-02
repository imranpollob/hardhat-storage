require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        goerli: {
            url: process.env.GOERLI_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
            chainId: 5,
        },
        ganache: {
            url: process.env.GANACHE_RPC_URL,
            accounts: [process.env.PRIVATE_KEY2],
            chainId: 5777,
        },
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY || "",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY || "",
    },
};
