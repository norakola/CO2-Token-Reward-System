// contracts/Co2Token.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19; // In my visual studio code, only this works with this version


//import "node_mo/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";


contract Co2Token is ERC20  {

  

    mapping(address => uint256) private lastUpdateTime;
    mapping(address => uint256) private totalCosts;
    mapping(address => uint256) private numberOfEntries;
    mapping(address => uint256) private averageCosts;
    

    uint256 constant initialReward = 100; // Initial reward of 100 tokens (First entry begins with an 100 token reward)
    uint256 public updateInterval = 5 seconds; // In the real case 1 month
    uint256  _costs; // Electricity costs entered by the user

    //Require these real variables, for the conversion of electricity costs into co2 emissions in Germany:
    uint constant CO2_PER_KWH = 434; // in Gramm
    uint constant PRICE_PER_KWH = 42; // in Cent (42,29Cent, man könte es Skalieren)



    constructor() ERC20("Co2Token", "Co2") {
             
             
    }


    
    // Explanaition of the function reportEnergyCosts(uint256 _userInputCosts ){}:

    // In this function, the user enters payments one after the other (electricity costs, one after the other means in the real case once every month, in this prototype every 5 seconds)
    // The electricity costs are stored in an array and the average value is recalculated each time.
    // Regarding the improvement or deterioration of the average value with each new entry, tokens are immediately transferred (minted) to the user or burned from his account
    // With the first entry, the user receives 100 tokens as a gift.
    // The percentage of improvement of the average value is then paid out in tokens (10% improvement -> 10 token reward (mybe we make it 100)
    // From a 20% degradation, the user will be burned the same amount of tokens (30% degradation -> 30 token burn from his account)
    // If the user manages to keep his average the same for the next entry, he receives 10 token as a reward

    function reportEnergyCosts(uint256 _userInputCosts ) public payable  {
    _costs = _userInputCosts * ( 10 ** decimals()); // Scales the input to Wei units
    require(block.timestamp >= lastUpdateTime[msg.sender] + updateInterval, "Cannot update costs yet");

    uint256 reward = 0;
    uint256 previousAverage; // Declaration of the variable previousAverage


    if (numberOfEntries[msg.sender] > 0) {
        previousAverage = averageCosts[msg.sender]; 
        totalCosts[msg.sender] += _costs;
        numberOfEntries[msg.sender]++;
        averageCosts[msg.sender] = totalCosts[msg.sender] / numberOfEntries[msg.sender]; // cost/number of inputs = average

        if (averageCosts[msg.sender] < previousAverage) {
            uint256 percentageImprovement = ((previousAverage - averageCosts[msg.sender]) * 100) / previousAverage;
            reward = percentageImprovement; // the calculated % is saved as the token reward
        }

        else if (averageCosts[msg.sender] == previousAverage) {
            reward = 10; // 10 tokens reward for holding the average value
        }
        else  if (averageCosts[msg.sender] > previousAverage) { // this is the "oken burn" if statement
            uint256 percentageIncrease = uint256((averageCosts[msg.sender] - previousAverage) * 100) / (previousAverage);

            if (percentageIncrease >= 20) {
                // Calculate the number of tokens to be burned (as a percentage of the current token balance)
                uint256 tokensToBurn = (uint256(percentageIncrease) * balanceOf(msg.sender)) / 100;

                if (tokensToBurn > balanceOf(msg.sender)) {
                    // If more tokens are to be burned than the user has, update the mappings and burn all tokens instead
                    totalCosts[msg.sender] -= _costs;
                    numberOfEntries[msg.sender]--;
                    _burn(msg.sender, balanceOf(msg.sender));
                } else {
                   // tokens here beeing finally burned
                    _burn(msg.sender, tokensToBurn);
                }
            }
        }

    } else {
        totalCosts[msg.sender] = _costs;
        numberOfEntries[msg.sender] = 1;
        averageCosts[msg.sender] = _costs;
        reward = initialReward; // Reward for the first entry
    }

    if(reward > 0) {
        _mint(msg.sender  , reward * ( 10 ** decimals())); // the reward beeing finally minted
    }

    lastUpdateTime[msg.sender] = block.timestamp;

}


function rewardd () public payable {

     uint256  eingabe = 10;
     _mint(msg.sender  , eingabe * ( 10 ** decimals()));
}

// Function for reading out the current avargecost, so the user knows 
 function getCurrentAverageCosts(address user) public view returns (uint) {
        return averageCosts[user] / (1 ether);
 }



// Function for reading out the current (total) EnergyCosts, so the user knows 
 function getEnergyCosts(address user) public view returns (uint) {
        return totalCosts[user] / (1 ether);
 }


// Function for reading out the current Co2Emission in Gramm, so the user knows 
 function EmissionsInGramm() public view returns (uint) {
    uint verbrauchteKWh = (_costs * 100) / PRICE_PER_KWH;
    uint co2Emissionen = verbrauchteKWh * CO2_PER_KWH;
    return co2Emissionen / (1 ether); // Result in grams  
 }


// Function for reading out the current Co2Emission in Kilogramm, so the user knows 
 function EmissionsInKilogramm() public view returns (uint) {
    uint co2EmissionenGramm = EmissionsInGramm();
    uint co2EmissionenKg = co2EmissionenGramm / 1000;
    return co2EmissionenKg ; // Result in kilograms
 } 



}

