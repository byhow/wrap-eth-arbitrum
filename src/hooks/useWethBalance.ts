import { useSimulateContract } from "wagmi";
import { parseAbi } from "viem";
import { WETH_ABI } from "@/lib/constants";

/**
 * Custom hook to get the WETH balance of a given address.
 * 
 * @param address - The Ethereum address for which to retrieve the WETH balance.
 * @returns The WETH balance of the specified address.
 */
export const useWethBalance = (address: string) => {
  return useSimulateContract({
    abi: parseAbi(WETH_ABI),
    address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    functionName: "balanceOf",
    args: [address],
  });
};