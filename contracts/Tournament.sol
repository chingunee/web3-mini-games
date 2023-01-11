// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../contracts/IERC20Token.sol";

contract TournamentTest {
    uint256 public prize;
    address public organizer;
    address public mockToken;

    Player[] public players;

    IERC20Token public token;

    constructor(address _mockToken) public {
        token = IERC20Token(_mockToken);
        organizer = msg.sender;
    }

    // Initializing player of tournament.
    struct Player {
        address p_address;
        string nickname;
        uint life; // without life cannot play a web mini-game and get a score.
        uint score; // can get a score by playing mini-game on web.
    }

    mapping(address => uint) public addressToPlayerId;
    mapping(uint => address) public playerIdToAddress;

    event NewPlayer(address player, string name);
    event PrizeIncreased(uint256 newPrize);
    event PlayerScoreIncreased(address player, uint score);
    event PlayerEliminated(address player);

    // We will organize a weekly tournament in 
    // which users can participate by using MNFT tokens.
    // All tokens used for participation 
    // will be added to the tournament prize pool. 

    function participate(string memory _nickname, uint amount) external {
        require(addressToPlayerId[msg.sender] == 0, "Already registered address");
        require(amount > 0, "Must pay a fee to enter the tournament.");
        bool sentFeeToPrize = token.transferFrom(msg.sender, organizer, amount);
        require(sentFeeToPrize,"Prize transfer failed");
        prize += amount;
        players.push(Player({
                life: amount /= 100, // You can get 1 life with 100 tokens.
                score: 0,
                p_address: msg.sender,
                nickname: _nickname
            }));
        
        playerIdToAddress[players.length] = msg.sender;
        addressToPlayerId[msg.sender] = players.length;

        emit NewPlayer(msg.sender, _nickname);
        emit PrizeIncreased(prize);
    }

    function increasePrize(uint256 amount) public {
        require(msg.sender == organizer, "Only the organizer can increase the prize.");
        prize += amount;
        emit PrizeIncreased(amount);
    }

    function addScore(uint _score) public {
        require(_score >= 0, "Score cannot be negative");
        require(addressToPlayerId[msg.sender] != 0, "Not registered address");
        uint playerId = addressToPlayerId[msg.sender];
        require(playerId <= players.length, "Player does not exist in the tournament");
        players[playerId - 1].score += _score;
    }

    function claimPrize() public {
        require(msg.sender == organizer, "Only the organizer can transfer the prize.");
        require(prize > 0, "There is no prize");
        uint highestScore = 0;
        address highestScorer;
        
        for (uint i = 0; i < players.length; i++) {
            if (players[i].score > highestScore) {
                highestScore = players[i].score;
                highestScorer = players[i].p_address;
            }
        }

        uint prizeWon = prize / 2;
        bool sentPlayerPrizeWon = token.transferFrom(organizer, highestScorer, prizeWon);
        require(sentPlayerPrizeWon,"Prize won transfer failed");

        if(sentPlayerPrizeWon) {
            prize = 0;
        }
    }
}