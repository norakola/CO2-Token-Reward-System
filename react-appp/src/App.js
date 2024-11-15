
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
const web3 = require('web3');




const App = () => {

  const { ethereum } = window;
  const [userInput, setUserInput] = useState("");
  const [emissions, setEmissions] = useState('');
  const [energyCosts, setEnergyCosts] = useState('');
  const [currentAverageCosts, setCurrentAverageCosts] = useState('');
  const [emissionsInKilogramm, setEmissionsInKilogramm] = useState('');
  const [emissionTotal, setemissionTotal] = useState('');
  const [balance, setBalance] = useState('');




  const contractAddress = "0xeb85578Dc944FF6d1d1724ed22B92e5C828bbbe8";

  const abi =[
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
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "EmissionTotal",
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
      "name": "getBalance",
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
      //Metamask nicht installiert 
      console.log("Bitte installieren Sie MetaMask");
    }
  }



  const report = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      const accounts = await web3.eth.getAccounts(); // Holt die Benutzeradressen
      try {

        if (accounts.length === 0) {
          console.log("Keine Accounts gefunden. Ist der Benutzer bei der Wallet angemeldet?");
          return; // Beendet die Funktion frühzeitig, wenn keine Accounts gefunden werden.
        }

        const fromAddress = accounts[0];
        console.log("Transaktion wird gesendet von:", fromAddress);

        await contract.methods.reportEnergyCosts(userInput).send({ from: fromAddress });
        console.log("Tokens erfolgreich gemintet für:", fromAddress);
        await getBalance(); // Aktualisiert das Guthaben nachdem reportEnergyCosts aufgerufen wurde.
      } catch (error) {
        console.error("Fehler beim Minten der Tokens:", error);
      }
    }
  }




  //Funktion zum Auslesen der aktuellen Co2-Emission in Gramm.
  const getEmissionsInGramm = async () => {
    if (typeof window.ethereum !== "undefined" && contract) {
      try {
        const emissionsInGramm = await contract.methods.EmissionsInGramm().call();
        setEmissions(emissionsInGramm.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Nicht initialisiert');
    }
  };



  //Funktion zum Auslesen der aktuellen Co2-Emission in Kilogramm.
  const getEmissionsInKilogramm = async () => {
    if (typeof window.ethereum !== "undefined" && contract) {
      try {
        const emissionsInKilogramm =
          await contract.methods.EmissionsInKilogramm().call();
        setEmissionsInKilogramm(emissionsInKilogramm.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Nicht initialisiert');
    }
  };




  // Funktion zum Auslesen der gesamten Co2-Emissionen in kg.
  const EmissionTotal = async () => {
    if (typeof window.ethereum !== "undefined" && contract) {
      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];
      try {
        const emissionTotal = await contract.methods.EmissionTotal(fromAddress).call({ from: fromAddress });
        setemissionTotal(emissionTotal.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Nicht initialisiert');
    }
  }


  //Funktion zum Auslesen der aktuellen (gesamten) Stromkosten.
  const GetEnergyCosts = async () => {
    if (typeof window.ethereum !== "undefined" && contract) {
      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];
      try {
        const energyCosts = await
          contract.methods.getEnergyCosts(fromAddress).call({ from: fromAddress });
        setEnergyCosts(energyCosts.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Nicht initialisiert');
    }
  }




  //Funktion zum Auslesen des Guthabens.
  const getBalance = async () => {
    if (typeof window.ethereum !== "undefined" && contract) {
      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];
      try {
        const balanceWei = await contract.methods.getBalance(fromAddress).call({ from: fromAddress });
        const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
        setBalance(balanceEther); // Jetzt ist es ein String im Ether-Format
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Nicht initialisiert');
    }
  }

  useEffect(() => {
    if (ethereum) {
      getBalance();
    }
  }, [ethereum]); // Die Abhängigkeitsliste enthält 'ethereum', um die Funktion erneut auszuführen, wenn sich 'ethereum' ändert.



  //Funktion zum Auslesen der aktuellen Durchschnittsstrommenge.
  const GetCurrentAverageCosts = async () => {
    if (typeof window.ethereum !== "undefined" && contract) {
      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];
      try {
        const currentAverageCosts = await contract.methods.getCurrentAverageCosts(fromAddress).call({ from: fromAddress });
        setCurrentAverageCosts(currentAverageCosts.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Nicht initialisiert');
    }
  };





  return (
    <div className="CO2">
      <header className="App-header" style={{ position: 'relative', paddingBottom: '30px', right: '20px', }}>
        <h1 className="title" style={{
          marginBottom: '182px',
          fontSize: '75px',
          left: '0px',
          top: '10px',
          padding: '10px',
          fontFamily: '"Times New Roman", Times, serif',
          transform: 'translateY(-5px)',
          webkittextstroke: '2px rgba(0, 0, 0, 0.089)',

        }}>
          CO2 Token
        </h1>
        <a style={{
          color: 'white',
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: '16px',
          position: 'relative',
          top: '-194px',
          left: '-20px',
          margin: '0',
          textAlign: 'center',
        }}>
          Dein Umwelt Token
        </a>
        <p style={{
          color: 'white',
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: '16px',
          position: 'relative',
          top: '41px',
          left: '-20px',
          margin: '0',
          textAlign: 'center',
        }}>
          Trage bei. Profitiere.

        </p>
        <button onClick={connectMetamask} style={{
          position: 'absolute',
          top: '64px',
          right: '10%',
          transform: 'translateX(50%)',
          padding: '15px 20px',
          margin: '10px',
          fontSize: '18px',
          border: '2px solid white',
        }}>
          Verbinden mit Metamask
        </button>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '60px',
          marginTop: '40px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
            <input
              type="number"
              placeholder="Eingabe kWh"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{ padding: '6px', width: '350px', fontSize: '17px', fontStyle: 'italic' }}
            />
            <button onClick={() => report(userInput)} style={{ padding: '10px 20px', width: '200px', fontSize: '18px', border: '2px solid white' }}>Belohnung</button>
            <div style={{
              padding: '20px 14px',
              margin: '0px 10px',
              fontSize: '20px',
              border: '4px solid black',
              backgroundColor: 'rgba(254, 250, 250, 0.640)',
            }}>
              {balance && (
                <span style={{ fontSize: '18px', color: 'black' }}>
                  <strong style={{ fontWeight: 'bold', }}> {balance} CO2 </strong>
                </span>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <button onClick={GetCurrentAverageCosts} style={{ padding: '10px 20px', fontSize: '18px', border: '1px' }}>Aktueller Durchschnitt</button>
              {currentAverageCosts && (
                <span style={{ fontSize: '18px', color: 'white', WebkitTextStroke: '1px black' }}>
                  <strong style={{ fontWeight: 'bold' }}>{currentAverageCosts} kWh </strong>
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <button onClick={GetEnergyCosts} style={{ padding: '10px 20px', fontSize: '18px', border: '1px' }}>Gesamtstrom</button>
              {energyCosts && (
                <span style={{ fontSize: '18px', color: 'white', WebkitTextStroke: '1px black' }}>
                  <strong style={{ fontWeight: 'bold' }}>{energyCosts} kWh </strong>
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <button onClick={EmissionTotal} style={{ padding: '10px 20px', fontSize: '18px', border: '1px' }}>Gesamtes CO2</button>
              {emissionTotal && (
                <span style={{ fontSize: '18px', color: 'white', WebkitTextStroke: '1px black' }}>
                  <strong style={{ fontWeight: 'bold' }}>{emissionTotal} kg CO2e/kWh </strong>
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <button onClick={getEmissionsInKilogramm} style={{ padding: '10px 20px', fontSize: '18px', border: '1px' }}>CO2-Kilogramm</button>
                {emissionsInKilogramm && (
                  <span style={{ fontSize: '18px', color: 'white', WebkitTextStroke: '1px black' }}>
                    <strong style={{ fontWeight: 'bold' }}>{emissionsInKilogramm} kg CO2e/kWh </strong>
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <button onClick={getEmissionsInGramm} style={{ padding: '10px 20px', fontSize: '18px', border: '1px' }}>CO2-Gramm</button>
                {emissions && (
                  <span style={{ fontSize: '18px', color: 'white', WebkitTextStroke: '1px black' }}>
                    <strong style={{ fontWeight: 'bold' }}>{emissions} g CO2e/kWh </strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <p style={{
          color: 'white',
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: '15px',
          position: 'relative',
          top: '103px',
          left: '0px',
          margin: '50',
          textAlign: 'center',
        }}>
          copyright 2024.
        </p>
      </header>
    </div>
  );


}

export default App;
