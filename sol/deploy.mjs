
import { ethers } from 'ethers';
import { readFileSync } from 'fs';


async function main() {
  const provider = new ethers.providers.InfuraProvider('sepolia', '452612da808f4ec6a4528fde9f40ea82');
  const wallet = new ethers.Wallet('bb243433c6328e0c24fd4d6da87538707f4ae79ccd582236c5aa7684f5e7afde',provider);

  const abi = JSON.parse(readFileSync('./HelloWorld_sol_HelloWorld.abi', 'utf8'));
  const bytecode = readFileSync('./HelloWorld_sol_HelloWorld.bin', 'utf8');

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  console.log('Deploying contract...');
  const contract = await factory.deploy("Hello, Blockchain!");
  await contract.deployed();

  console.log('Contract deployed at address:', contract.address);
}

main().catch((error) => {
  console.error(error);
});
