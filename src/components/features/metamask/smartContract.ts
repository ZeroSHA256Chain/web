import { SmartContractRepository } from "@/blockchain/SmartContractRepository";
import ABI from "@/blockchain/smart_contract_abi.json";

const provider = "http://127.0.0.1:8545/";
const contractAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508";

export const getSmartContractRepository = (
  connectedAccount: string
): SmartContractRepository => {
  return new SmartContractRepository(
    provider,
    contractAddress,
    ABI.abi,
    connectedAccount
  );
};
