const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("Storage", () => {
    let storageFactory, storage;

    beforeEach(async () => {
        storageFactory = await ethers.getContractFactory("Storage");
        storage = await storageFactory.deploy();
    });

    it("Should start with a favourite number of 0", async () => {
        const currentValue = await storage.retrieve();
        const expectedValue = "0";

        assert.equal(currentValue.toString(), expectedValue);
        // expect(currentValue.toString()).to.equal(expectedValue)
    });

    it("Should update when we call store", async function () {
        const expectedValue = "7";
        const transactionResponse = await storage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await storage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("Should work correctly with the people struct and array", async function () {
        const expectedPersonName = "Patrick";
        const expectedFavoriteNumber = "16";
        const transactionResponse = await storage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber
        );
        await transactionResponse.wait(1);
        const { favoriteNumber, name } = await storage.people(0);

        assert.equal(name, expectedPersonName);
        assert.equal(favoriteNumber, expectedFavoriteNumber);
    });
});
