const { ethers, run, network } = require("hardhat");

async function main() {
    const StorageFactory = await ethers.getContractFactory("Storage");
    console.log("Deploying contract ...");
    const contract = await StorageFactory.deploy();
    await contract.deployed();
    console.log("Contract deployed to " + contract.address);

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmation");
        await contract.deployTransaction.wait(1);
        await verify(contract.address, []);
    }

    const currentValue = await contract.retrieve();
    console.log(`Current Value is: ${currentValue}`);

    // Update the current value
    const transactionResponse = await contract.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await contract.retrieve();
    console.log(`Updated Value is: ${updatedValue}`);
}

const verify = async (contractAddress, args) => {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(e);
        }
    }
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
