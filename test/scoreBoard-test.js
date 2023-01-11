const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ScoreBoard", () => {
  let accounts;

  before(async () => {
    // Get the list of accounts
    accounts = await ethers.getSigners();

    const ScoreBoard = await ethers.getContractFactory("ScoreBoard");
    scoreBoardContract = await ScoreBoard.deploy();
    await scoreBoardContract.deployed();
  });

  it("should create a player", async () => {
    // Create a player with a score of 42
    await scoreBoardContract.create(42);

    // Get the player
    const [score, address] = await scoreBoardContract.get(0);

    // Check the player's score and address
    expect(score.toNumber()).to.equal(42);
    expect(address).to.equal(accounts[0].address);
  });

  it("should add score to a player", async () => {
    // Create a player with a score of 10
    await scoreBoardContract.create(10);

    // Add 20 points to the player's score
    await scoreBoardContract.addScore(1, 20);

    // Get the player
    const [score, address] = await scoreBoardContract.get(1);

    // Check the player's updated score and address
    expect(score.toNumber()).to.equal(30);
    expect(address).to.equal(accounts[0].address);
  });
});
