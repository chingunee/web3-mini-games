const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function main() {
  const ScoreBoard = await ethers.getContractFactory("ScoreBoard");
  const scoreBoardContract = await ScoreBoard.deploy();
  await scoreBoardContract.deployed();

  console.log("scoreBoardContract deployed to:", scoreBoardContract.address);

  const content = {
    scoreBoard: scoreBoardContract.address,
  };
  createAddressJson(
    path.join(__dirname, "/../app/genAddresses.json"),
    JSON.stringify(content)
  );
}

function createAddressJson(path, content) {
  try {
    fs.writeFileSync(path, content);
    console.log("Created Contract Address JSON");
  } catch (err) {
    console.error(err);
    return;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
