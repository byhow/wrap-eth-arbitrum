import { http, createConfig } from 'wagmi'
import { arbitrum, arbitrumSepolia } from 'wagmi/chains'
import { isNonNullAddress } from './utils';
import type { Address } from 'viem';
import { Logger } from 'next-axiom';

export const config = createConfig({
  chains: [arbitrum, arbitrumSepolia],
  transports: {
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
})

export function safeGetWethAddress(): Address {
  const log = new Logger();
  const defaultAddress = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"; // hardcoded WETH contract address
  const WETH_ADDRESS = process.env.NEXT_PUBLIC_WETH_CONTRACT_ADDRESS;

  if (isNonNullAddress(WETH_ADDRESS)) {
    return WETH_ADDRESS;
  } else {
    log.warn(`NEXT_PUBLIC_WETH_CONTRACT_ADDRESS environment variable is not set or invalid. Using default address: ${defaultAddress}`);
    return defaultAddress;
  }
}
