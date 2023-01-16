// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../contracts/interfaces/IERC20Token.sol";

    // We will organize a weekly tournament in 
    // which users can participate by using MNFT tokens.

    // All tokens used for participation 
    // will be added to the tournament prize pool.

contract Tournament {
    uint public prize;
    uint public playerId;
    uint public tournamentEndTime;

    address public organizer;
    address public mockToken;

    bool ended; 

    Player[] public players;
    IERC20Token public token;

    mapping(address => uint) public addressToPlayerId;
    mapping(uint => address) public playerIdToAddress;
    
    mapping(string => bool) registeredNickname;

    event PrizeIncreased(uint NewPrize);

    event PlayerScoreIncreased(address player, uint score);
    event PlayerLifeIncreased(address player, uint life);
    event NewPlayer(address player, string name);

    event TournamendEnded(address winner, uint amount);

    // The tournament has already ended.
    error TournamentAlreadyEnded();

    // The tournament has not ended yet.
    error TournamentNotYetEnded();

    // The function claimPrize() already called.
    error ClaimPrizeAlreadyCalled();

    // Initializing player of tournament.
    struct Player {
        address p_address;
        string nickname;
        uint life; // without life cannot play a web mini-game and get a score.
        uint score; // can get a score by playing mini-game on web.
    }

    constructor(
        address _mockToken,
        address _tournamentOwner,
        uint _tournamentEndTime
        ) {
        token = IERC20Token(_mockToken);
        organizer = _tournamentOwner;
        tournamentEndTime = block.timestamp + _tournamentEndTime;
    }

    modifier onlyOrganizer() {
        require(
            msg.sender == organizer, 
            "Only organizer can claim the prize and transfer prize to the winner of the tournament.");
        _;
    }

    modifier onlyPlayer() {
        playerId = addressToPlayerId[msg.sender];
        require(
            addressToPlayerId[msg.sender] != 0 &&
            playerId <= players.length
            , "Not registered address");
        _;
    }

    function participate(string memory _nickname, uint amount) external {
        if(block.timestamp > tournamentEndTime)
            revert TournamentAlreadyEnded();
        require(
            addressToPlayerId[msg.sender] == 0,
            "Already registered address");
        require(
            amount >= 100,
            "Must pay a MNFT to enter the tournament. 1 life == 100 MNFT");
        require(
            !registeredNickname[_nickname],
            "Invalid nickname.");

        bool sentFeeToPrize = token.transferFrom(msg.sender, address(this), amount);
        require(
            sentFeeToPrize,
            "Prize transfer failed");

        prize += amount;
        players.push(Player({
                life: amount /= 100, // You can get 1 life with 100 tokens.
                score: 0,            
                p_address: msg.sender,
                nickname: _nickname
            }));
            
        playerIdToAddress[players.length] = msg.sender;
        addressToPlayerId[msg.sender] = players.length;
        registeredNickname[_nickname] = true;

        emit NewPlayer(msg.sender, _nickname);
        emit PrizeIncreased(prize);
    }

    function buyLife(uint amount) public onlyPlayer {
        bool sentTokenToLife = token.transferFrom(msg.sender, address(this), amount);
        require(sentTokenToLife, "The transfer of buying a life has failed.");
        amount /= 100;
        if(sentTokenToLife) {
            players[playerId - 1].life += amount;
        }
        emit PlayerLifeIncreased(msg.sender, amount);
    }

    function decreaseLife(uint amount) public onlyPlayer {
        players[playerId - 1].life -= amount;
    }

    function increasePrize(uint amount) public onlyOrganizer {
        bool increasedPrize = token.transferFrom(msg.sender, address(this), amount);
        require(increasedPrize, "The transfer of increasing prize has failed.");
        prize += amount;
        emit PrizeIncreased(prize);
    }

    function addScore(uint _score) public onlyPlayer {
        require(
            _score >= 0, 
            "Score cannot be negative");
        require(
            players[playerId - 1].life == 0,
            "In order to add score your balance you have to play until your life zero");
        
        players[playerId - 1].score += _score;
    }

    function claimPrize() public onlyOrganizer {
        if(block.timestamp < tournamentEndTime)
            revert TournamentNotYetEnded();
        
        if(ended) 
            revert ClaimPrizeAlreadyCalled();

        require(prize > 0, "There is no prize");

        uint highestScore = 0;
        address highestScorer;
        
        for (uint i = 0; i < players.length; i++) {
            if (players[i].score > highestScore) {
                highestScore = players[i].score;
                highestScorer = players[i].p_address;
            }
        }
        ended = true;
        emit TournamendEnded(highestScorer, prize);

        bool sentPlayerPrizeWon = token.transfer(highestScorer, prize);
        require(sentPlayerPrizeWon, "Prize won transfer failed");
        
        if(sentPlayerPrizeWon) {
            prize = 0;
        }
    }   
}