# DEDUAssess - Decentralized EDU Assessment

We, the ZeroSHA256Chain team, are dedicated to developing an innovative 
blockchain-based platform that enables students to validate their completed tasks while
allowing educators and independent experts to efficiently verify these achievements.
Our goal is to create a transparent, automated, and secure system for tracking educational
success.


---

## Getting Started

This guide will help you set up the development environment, run tests, and deploy the contract either locally. Whether you're a developer new to blockchain or an experienced contributor, these instructions are designed to help you get up and running quickly.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** or **bun**

For Hardhat installation and documentation, visit the [Hardhat Getting Started Guide](https://hardhat.org/hardhat-runner/docs/getting-started).

---

## Local hardhat setup

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

4 **Running Tests**
   To run the complete test suite and ensure everything is working as expected, execute:
   ```bash
   npx hardhat test
   ```

---

## Local Smart Contract Deployment and UI Interaction
To deploy and interact on your local blockchain network, follow these steps:
1. **Start a Local Hardhat Node:**
   ```bash
   npx hardhat node
   ```
   This command starts a local Ethereum JSON-RPC server at http://127.0.0.1:8545/
   Also you can see a list of test accounts you can use later
3. **Deploy the Contract Locally:**
   ```bash
   npx hardhat ignition deploy ./ignition/modules/DEDUAssess.js --network localhost
   ```
4. **Add local network to MetaMask**
   
   First, you need to visit our [website](https://web-zeta-wheat-80.vercel.app/). In the pop-up window, you will need to connect your MetaMask wallet.

   Next, we go to MetaMask and connect to our local network:

   - First click. ```Select a network```

   - Second click. ```+ Add a custome network```

   ![image](https://github.com/user-attachments/assets/903cb17b-1042-4523-a52d-f0ad64f38466)

   You should see something similar to this.

5. **Get test account**
   
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

## Running UI localy
You can use deployed website on https://web-zeta-wheat-80.vercel.app/ but it is also possible to start it localy

1. clone web repository
2. npm install
3. npm run dev

# Using UI

1. After connecting to metamask you can see a starting page. Firstly add a project.
<img width="551" alt="image" src="https://github.com/user-attachments/assets/b6acf34e-0016-4fd3-9a48-628fe17d1f6e" />

2. After reloading projects, you can see the project in a "Projects you can verify" list
   <img width="1453" alt="image" src="https://github.com/user-attachments/assets/542fb559-96d9-43f1-aa69-2b32d21704bc" />

3. Choose different account in MetaMask and reload page

   <img width="336" alt="image" src="https://github.com/user-attachments/assets/299043ed-9961-4ced-9ef3-c01f259bd28e" />

4. Now open the project and submit a task
   <img width="1216" alt="image" src="https://github.com/user-attachments/assets/ca4d1054-3eae-44c4-b656-9498fc782cc6" />

5. Choose previous account and open your project. You can see a submitted task.
<img width="1170" alt="image" src="https://github.com/user-attachments/assets/bc5789db-3946-4955-be48-015fdeda3528" />

6. Verify or reject it and reload submission lists
   <img width="1158" alt="image" src="https://github.com/user-attachments/assets/2101af02-e225-4ea9-8d6b-39fbafb894e4" />
<img width="1384" alt="image" src="https://github.com/user-attachments/assets/78b175d0-615e-47c3-8559-564ca661c439" />

7. You can verify any submission on "Verify Submission" Page
<img width="1463" alt="image" src="https://github.com/user-attachments/assets/ecd9cbda-768c-46d2-a8e6-a4245f8d450e" />




---

## Latest Deployed Contract

The most recent deployment of the ```DEDUAssess``` contract is available at:
```
0xC3B6ECF9E480c27A9492A975710Bb976ED008e7b
```
You can view the contract details on the 
[Polygon Amoy Explorer](https://amoy.polygonscan.com/address/0xC3B6ECF9E480c27A9492A975710Bb976ED008e7b)


