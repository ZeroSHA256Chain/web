# Blockchain-Based Auction Platform

The Blockchain-Based Auction Platform is designed to transform traditional auctions by leveraging blockchain technology. It creates a secure, transparent, and trustless environment for auctioning digital and physical assets. The platform is built on a robust two-layer architecture:

## Frontend Architecture

### Core Technologies
- **React**: Modern UI development using [React 19](https://react.dev/)
  - Leverages hooks and functional components
  - Built with TypeScript for type safety

### Web3 Integration
- **[Web3.js](https://web3js.readthedocs.io/en/v1.10.0/)**
  - Ethereum JavaScript API
  - Smart contract interaction
- **MetaMask Integration**
  - Wallet connection
  - Transaction signing
  - Account management

### UI Components & State
- **[Chakra UI](https://chakra-ui.com/)**
  - Accessible component library
  - Responsive design system
  - Dark/light mode support

- **[TanStack](https://tanstack.com/) Suite**
  - `@tanstack/react-form`: Type-safe form management
  - `@tanstack/react-router`: Modern routing with type safety

- **[Jotai](https://jotai.org/)**
  - Atomic state management
  - Optimized for React concurrent features
  - Minimal boilerplate

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions
- Cross-browser compatibility

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

