import { type Address, isAddress } from "viem";

/**
 * checks if the given value is not null and a valid Ethereum address
 * 
 * note: the `isAddress` function from viem checks if the given value is a valid Ethereum address too
 * {@link https://viem.sh/docs/utilities/isAddress Viem.sh Documentation}
 * @param value 
 * @returns 
 */
export function isNonNullAddress(value: unknown): value is Address {
  return typeof value === 'string' && isAddress(value);
}