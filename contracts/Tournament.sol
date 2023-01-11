// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../contracts/MockToken.sol";

contract Tournament {
    uint256 public prize;
    address public organizer;

    MockToken public mockToken;
    Player[] public player;

    struct Player {
        uint life;
        uint score;
        address p_address;
        string nickname;
    }

    mapping(address => uint) public addressToPlayerId;
    mapping(uint => address) public playerIdToAddress;

    event NewPlayer(address player, string name);
    event PrizeIncreased(uint256 newPrize);

    constructor(address _token) {
        organizer = msg.sender;
        mockToken = MockToken(_token);
    }

    function participate(string memory _nickname) external payable  {
        require(addressToPlayerId[msg.sender] == 0, "Already registered address");
        require(msg.value > 0, "Must pay a fee to enter the tournament.");
        uint value = msg.value;
        prize += msg.value;

        player.push(Player({
                life: value/= 100,
                score: 0,
                p_address: msg.sender,
                nickname: _nickname
            }));
        
        playerIdToAddress[player.length] = msg.sender;
        addressToPlayerId[msg.sender] = player.length;

        emit NewPlayer(msg.sender, _nickname);
        emit PrizeIncreased(prize);
    }
    
    function increasePrize(uint256 amount) public {
        require(msg.sender == organizer, "Only the organizer can increase the prize.");
        prize += amount;
        emit PrizeIncreased(amount);
    }

    // require(msg.sender == playerIdToAddress[_index], "You have to participate tournament");

    // function addScore(uint _index, uint _score) external {
    //     player[_index].score += _score;
    // }

    function _addScore(uint _score) external {
        // require(playerIdToAddress, message);
        require(addressToPlayerId[msg.sender] != 0, "Not registered address");
        player[addressToPlayerId[msg.sender] + 1].score += _score;
    }

    function claimPrize() external {
        
    }
}