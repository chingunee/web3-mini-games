import { ethers } from "ethers";
import { getContractEssentials } from "./helpers";
import { scoreBoard } from "../genAddresses.json";
import scoreBoardAbi from "../abi/ScoreBoard.json";

async function getScoreBoardContract() {
  let { provider, signer } = await getContractEssentials();

  const scoreBoardReadContract = new ethers.Contract(
    scoreBoard,
    scoreBoardAbi,
    provider
  );

  let scoreBoardWriteContract = scoreBoardReadContract.connect(signer);

  return { scoreBoardReadContract, scoreBoardWriteContract };
}

export { getScoreBoardContract };
