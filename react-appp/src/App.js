
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
const web3 = require('web3');




const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { ethereum } = window;
  const [userInput, setUserInput] = useState("");
  const [emissions, setEmissions] = useState('');
  const [energyCosts, setEnergyCosts] = useState('');
  const [currentAverageCosts, setCurrentAverageCosts] = useState('');
  const [emissionsInKilogramm, setEmissionsInKilogramm] = useState('');




  const contractAddress = "0x78c492cF9575c2e118d0fc7b9B2090F7FE91beD3";

  const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "EmissionsInGramm",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "EmissionsInKilogramm",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getCurrentAverageCosts",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getEnergyCosts",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_userInputCosts",
          "type": "uint256"
        }
      ],
      "name": "reportEnergyCosts",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardd",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "updateInterval",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];


  let web3;

  web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, contractAddress)




  const connectMetamask = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        web3 = new Web3(window.ethereum)
      } catch (err) {
        console.log(err.message)
      }

    } else {
      //Metamask not installed 
      console.log("Please install MetaMask");
    }
  }


  const sendd = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      const accounts = await web3.eth.getAccounts();
      try {

        //  const accounts = await web3.eth.getAccounts(); // Holt die Benutzeradressen
        if (accounts.length === 0) {
          console.log("Keine Accounts gefunden. Ist der Benutzer bei der Wallet angemeldet?");
          return; // Beendet die Funktion frühzeitig, wenn keine Accounts gefunden werden
        }

        const fromAddress = accounts[0];
        console.log("Transaktion wird gesendet von:", fromAddress);

        await contract.methods.rewardd().send({ from: fromAddress });
        console.log("Tokens erfolgreich gemintet für:", fromAddress);
      } catch (error) {
        console.error("Fehler beim Minten der Tokens:", error);
      }
    }
  }





  const report = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      const accounts = await web3.eth.getAccounts(); // Holt die Benutzeradressen
      try {

        if (accounts.length === 0) {
          console.log("Keine Accounts gefunden. Ist der Benutzer bei der Wallet angemeldet?");
          return; // Beendet die Funktion frühzeitig, wenn keine Accounts gefunden werden
        }

        const fromAddress = accounts[0];
        console.log("Transaktion wird gesendet von:", fromAddress);

        await contract.methods.reportEnergyCosts(userInput).send({ from: fromAddress });
        console.log("Tokens erfolgreich gemintet für:", fromAddress);
      } catch (error) {
        console.error("Fehler beim Minten der Tokens:", error);
      }
    }
  }




  //Function for reading out the current Co2Emission in Gramm
  const getEmissionsInGramm = async () => {
    if (typeof window.ethereum !== "undefined" && contract) {
      try {
        // const emissionsInGramm = await contract.EmissionsInGramm();
        const emissionsInGramm = await contract.methods.EmissionsInGramm().call();
        setEmissions(emissionsInGramm.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Contract is not initialized');
    }
  };



  //Function for reading out the current Co2Emission in Kilogramm
  const getEmissionsInKilogramm = async () => {
    if (typeof window.ethereum !== "undefined" && contract) {
      try {
        const emissionsInKilogramm = await contract.methods.EmissionsInKilogramm().call();
        setEmissionsInKilogramm(emissionsInKilogramm.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Contract is not initialized');
    }
  };




  //Function for reading out the current (total) EnergyCosts
  const GetEnergyCosts = async () => {
    if (typeof window.ethereum !== "undefined" && contract) {
      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];
      try {
        // const emissionsInGramm = await contract.EmissionsInGramm();
        const energyCosts = await contract.methods.getEnergyCosts(fromAddress).call({ from: fromAddress });
        setEnergyCosts(energyCosts.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Contract is not initialized');
    }
  }



  //Function for reading out the current avarage electricity amount
  const GetCurrentAverageCosts = async () => {
    if (typeof window.ethereum !== "undefined" && contract) {
      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];
      try {
        // const emissionsInGramm = await contract.EmissionsInGramm();
        const currentAverageCosts = await contract.methods.getCurrentAverageCosts(fromAddress).call({ from: fromAddress });
        setCurrentAverageCosts(currentAverageCosts.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Contract is not initialized');
    }
  };








  return (
    <div className="App">
      <header className="App-header" style={{ position: 'relative', paddingBottom: '20px' }}>
        <h1 className="title" style={{ marginBottom: '40px' }}>Welcome to the CO3 Token</h1>
        <button onClick={connectMetamask} style={{
          position: 'absolute',
          top: '3px', // Höher positionieren
          right: '10%', // Mehr zur Mitte rücken
          transform: 'translateX(50%)', // Zentrieren basierend auf der eigenen Breite
          padding: '10px',
          margin: '10px'
        }}>
          Connect to Metamask
        </button>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginTop: '20px' // Zusätzlicher Abstand für die Überschrift
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <input
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{ padding: '10px', width: '200px' }}
            />
            <button onClick={() => report(userInput)} style={{ padding: '10px' }}>Execute</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <button onClick={sendd} style={{ padding: '10px' }}>Get Tokens</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <button onClick={getEmissionsInGramm} style={{ padding: '10px' }}>Co2 in Gramm</button>
            {emissions && <span style={{ fontSize: 'smaller' }}>Emissions in gramm: {emissions}</span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <button onClick={getEmissionsInKilogramm} style={{ padding: '10px' }}>Co2 in Kilogramm</button>
            {emissionsInKilogramm && <span style={{ fontSize: 'smaller' }}>Emissions in Kilogramm: {emissionsInKilogramm}</span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <button onClick={GetEnergyCosts} style={{ padding: '10px' }}>Energy Costs</button>
            {energyCosts && <span style={{ fontSize: 'smaller' }}>Energy Costs: {energyCosts}</span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <button onClick={GetCurrentAverageCosts} style={{ padding: '10px' }}>Current Average</button>
            {currentAverageCosts && <span style={{ fontSize: 'smaller' }}>Current Average Costs: {currentAverageCosts}</span>}
          </div>
        </div>
      </header>
    </div>
  );

}

export default App;