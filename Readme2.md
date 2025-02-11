# DEDUAssess - Decentralized EDU Assessment

**DEDUAssess** is a decentralized system designed to facilitate secure and transparent educational assessments on the blockchain. 

---

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running_tests)
- [Local Deployment and Interaction](#local-deployment-and-interaction)
- [Testnet Deployment](#testnet-deployment)
- [Latest Deployed Contract](#latest-deployed-contract)

---

## Getting Started

This guide will help you set up the development environment, run tests, and deploy the contract either locally or on a testnet. Whether you're a developer new to blockchain or an experienced contributor, these instructions are designed to help you get up and running quickly.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later)
- **Yarn** or **npm**
- **Hardhat** (a development environment for Ethereum smart contracts)

For Hardhat installation and documentation, visit the [Hardhat Getting Started Guide](https://hardhat.org/hardhat-runner/docs/getting-started).

---

## Installation

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

---

## Testnet Deployment

---

---

## Latest Deployed Contract

The most recent deployment of the ```DEDUAssess``` contract is available at:
```
0x2A4c1D303224A700BA8d7cC2d56fE3112c14D41B
```
You can view the contract details on the 
[Polygon Amoy Explorer](https://amoy.polygonscan.com/address/0x2A4c1D303224A700BA8d7cC2d56fE3112c14D41B)


