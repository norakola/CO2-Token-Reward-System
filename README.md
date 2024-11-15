# CO2-Token-Reward-System
CO2 Token Reward System
This project is a CO2 Token Reward System designed to motivate companies to reduce their carbon emissions by leveraging blockchain technology. By implementing an ERC-20 token, named CO2, the system rewards companies for reducing their CO2 output and penalizes them if their emissions increase. The project consists of a smart contract written in Solidity, and a front-end React application that interacts with the blockchain via MetaMask.

# Overview
The system works by allowing users (companies) to input their electricity consumption and CO2 emissions. Based on this data, the system calculates the user’s average carbon footprint. If the user reduces their CO2 emissions over time, they are rewarded with CO2 tokens. If their emissions worsen, these tokens are burned (penalizing the user). The main objective is to create an incentive for companies to lower their carbon output and encourage environmental responsibility.

# Key Features:
CO2 Token (ERC-20): A custom cryptocurrency built using the ERC-20 standard.
Reward System: Companies earn CO2 tokens as a reward for reducing their carbon emissions.
Penalty System: If the average electricity consumption (and thus the CO2 emissions) increases, tokens are burned from the user's wallet.
Real-Time CO2 Tracking: Users can track their CO2 emissions and energy consumption, see their improvements or regressions over time, and view the status of their CO2 token balance.
Smart Contract: Written in Solidity, the contract manages the CO2 token operations.
Frontend Application: A React.js app that connects to the smart contract and displays the user data, including the current energy consumption, CO2 emissions, and CO2 token balance.


# Project Structure

CO2-Token-Reward-Sytsem/

   |-CO2/
   
      |--contracs/
         |--- CO2Token.sol         # The ERC-20 Smart Contract for the CO2 token
         
      |--scripts/
         |---deploy.js             # Deploying the Smart Contract Address   
         |---hardhat.config.js     # Node Provider
         
      |--artifacts/   
         |--contracts/ 
           |---CO2Token.json       # ABI (defines the methods to interact with the smart 
                                    contract, both frontend and backend.)    
      |-react-app /
        |--src/
           |---App.js                # The React app that connects the smart contract to the 
                                     frontend

  

# How It Works
1. Smart Contract: CO2Token.sol
The smart contract defines the CO2 token (an ERC-20 token) and handles all token transfers and burning logic based on the user’s electricity consumption and CO2 emissions.

Reward Mechanism: Whenever a user submits their energy consumption data and CO2 emission improvements, the contract will reward them with CO2 tokens.
Penalty Mechanism: If the user’s average consumption increases (and CO2 emissions worsen), the smart contract will burn a set amount of their CO2 tokens as a penalty.

# 2. React Application: App.js
The React app is responsible for connecting the smart contract to the front-end. It interacts with the MetaMask wallet and allows the user to input their energy data, track CO2 emissions, and view their token balance.

MetaMask Integration: The React app communicates with MetaMask to allow users to send and receive CO2 tokens (with web.js)

Tracking CO2 Emissions: The app displays the user’s average electricity consumption, CO2 emissions in tons, and token balance in real time.

Frontend Interactions: Users can input their energy data, view whether they’re improving or worsening their emissions, and check if they are being rewarded or penalized.

# Technologies Used
Solidity: Smart contract language used to develop the CO2 token.
Ethereum: Blockchain platform for deploying the smart contract.
React.js & JavaScript: Frontend framework for building the web application.
Web3.js: Library to interact with the Ethereum blockchain from the frontend.
MetaMask: Browser extension that allows users to interact with the Ethereum network.
Alchemy : Connects the app to the Ethereum Sepolia testnet via the ALCHEMY_SEPOLIA_ENDPOINT.

