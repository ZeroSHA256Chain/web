# DEDUAssess - Decentralized EDU Assessment

We, the ZeroSHA256Chain team, are dedicated to developing an innovative 
blockchain-based platform that enables students to validate their completed tasks while
allowing educators and independent experts to efficiently verify these achievements.
Our goal is to create a transparent, automated, and secure system for tracking educational
success.


---

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running_tests)
- [Local Deployment and Interaction](#local-deployment-and-interaction)
- [Latest Deployed Contract](#latest-deployed-contract)

---

## Getting Started

This guide will help you set up the development environment, run tests, and deploy the contract either locally. Whether you're a developer new to blockchain or an experienced contributor, these instructions are designed to help you get up and running quickly.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later)
- **Yarn** or **npm**
- **Hardhat** (a development environment for Ethereum smart contracts)

For Hardhat installation and documentation, visit the [Hardhat Getting Started Guide](https://hardhat.org/hardhat-runner/docs/getting-started).

---

## Installation

Repository with the smart contract - https://github.com/ZeroSHA256Chain/smart_contract

1. **Clone the Repository:**
   ```bash
    git clone https://github.com/ZeroSHA256Chain/smart_contract
    cd smart_contract
    ```
2. **Install Hardhat (if not already installed):**
   ```bash
    npm install --save-dev hardhat
   ```
3. **Install Project Dependencies:**
   ```bash
    yarn   
    ```
    or
    ```bash
    npm install .
    ```

---

## Running Tests
   To run the complete test suite and ensure everything is working as expected, execute:
   ```bash
   npx hardhat test
   ```
  This command will compile the contracts and run all tests defined in the project.

---

## Local Deployment and Interaction
To deploy and interact on your local blockchain network, follow these steps:
1. **Start a Local Hardhat Node:**
   ```bash
   npx hardhat node
   ```
   This command starts a local Ethereum JSON-RPC server at http://127.0.0.1:8545/
2. **Deploy the Contract Locally:**
   ```bash
   npx hardhat ignition deploy ./ignition/modules/DEDUAssess.js --network localhost
   ```
3. **Add local network to MetaMask**
   
   First, you need to visit our [website](https://web-zeta-wheat-80.vercel.app/). In the pop-up window, you will need to connect your MetaMask wallet.

   Next, we go to MetaMask and connect to our local network:

   - First click. ```Select a network```

   - Second click. ```+ Add a custome network```

   ![image](https://github.com/user-attachments/assets/903cb17b-1042-4523-a52d-f0ad64f38466)

   You should see something similar to this.

4. **Get test account**
   
   When you run ```npx hardhat node```, you may see many test account:

   ![image](https://github.com/user-attachments/assets/d0f31144-ca87-49ea-b04e-e6b83cad89c9)

   These are **test accounts that have tokens** on the network and can be used for network testing.
   Choose one account that you like and copy its private key.

   Now you need to **return to MetaMask**:

   - First click: ```accounts```
   - Second click: ```+ Account or hardware wallet```
   - Third click: ```Import account```

   ![image](https://github.com/user-attachments/assets/6404a915-de2a-405e-a262-55d4d8864319)

   Now click ```import``` and test account should appear in your wallet.(with 10000 tokens)

   ![image](https://github.com/user-attachments/assets/125bb688-e887-4a1e-8aed-0b7c3d81e75e)

   Now you can return to our website and perform system testing :)
   
---

## Latest Deployed Contract

The most recent deployment of the ```DEDUAssess``` contract is available at:
```
0xC3B6ECF9E480c27A9492A975710Bb976ED008e7b
```
You can view the contract details on the 
[Polygon Amoy Explorer](https://amoy.polygonscan.com/address/0xC3B6ECF9E480c27A9492A975710Bb976ED008e7b)


