import { useSimulateContract } from "wagmi";
import { parseAbi } from "viem";

const WETH_ABI = [
  "function deposit() public payable",
  "function withdraw(uint wad) public",
  "function balanceOf(address owner) view returns (uint)",
];

export const useWethBalance = (address: string) => {
  return useSimulateContract({
    abi: parseAbi(WETH_ABI),
    address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    functionName: "balanceOf",
    args: [address],
  });
};