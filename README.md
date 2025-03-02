# Blockchain-Based Auction Platform

The Blockchain-Based Auction Platform is designed to transform traditional auctions by leveraging blockchain technology. It creates a secure, transparent, and trustless environment for auctioning both digital and physical assets. The platform is built on a robust two-layer architecture:

## Frontend Layer
- **Framework**: Developed using React.
- **Blockchain Integration**: Utilizes web3.js and Metamask.
- **Adaptive**: Supports both mobile and desktop interfaces.
- **Libs**: Uses Chakra UI and Atom for UI components and state management.

## Installation
```sh
bun i
```

## Running the Development Server
```sh
bun dev
```

## Environment Variables (.env)
Create a `.env` file in the root directory and add the following variables:

```ini
VITE_PROVIDER_URL="http://127.0.0.1:8545/"
VITE_SMART_CONTRACT_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3"
```

### Explanation:
- **VITE_PROVIDER_URL**: URL to the blockchain network provider (e.g., local Hardhat or Infura endpoint).
- **VITE_SMART_CONTRACT_ADDRESS**: Address of the deployed smart contract on the blockchain.

Ensure your `.env` file is included in `.gitignore` to prevent exposing sensitive data.

