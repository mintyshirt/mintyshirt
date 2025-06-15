import { ethers } from 'ethers';
import registryAbi from '../lib/abis/mintyShirtRegistry.json';

const REGISTRY_ADDRESS = (window as any).env?.VITE_CONTRACT_REGISTRY || import.meta.env.VITE_CONTRACT_REGISTRY || '';

export async function registerCreator(
  provider: ethers.providers.Web3Provider,
  name: string,
  profileUri: string
): Promise<number> {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(REGISTRY_ADDRESS, registryAbi, signer);
  const addr = await signer.getAddress();
  const tx = await contract.registerCreator(addr, name, profileUri);
  await tx.wait();
  const id: ethers.BigNumber = await contract.getCreatorIdByAddress(addr);
  return id.toNumber();
}

export async function getCreatorId(
  provider: ethers.providers.Web3Provider
): Promise<number> {
  const signer = provider.getSigner();
  const addr = await signer.getAddress();
  const contract = new ethers.Contract(REGISTRY_ADDRESS, registryAbi, provider);
  const id: ethers.BigNumber = await contract.getCreatorIdByAddress(addr);
  return id.toNumber();
}

export async function registerIPAsset(
  provider: ethers.providers.Web3Provider,
  creatorId: number,
  name: string,
  description: string,
  ipfsHash: string,
  contentType: string,
  allowAI: boolean
): Promise<number> {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(REGISTRY_ADDRESS, registryAbi, signer);
  const tx = await contract.registerIPAsset(
    creatorId,
    name,
    description,
    ipfsHash,
    contentType,
    allowAI
  );
  const receipt = await tx.wait();
  const event = receipt.events?.find((e: any) => e.event === 'IPAssetRegistered');
  if (event && event.args) {
    return (event.args.ipId as ethers.BigNumber).toNumber();
  }
  return 0;
}
