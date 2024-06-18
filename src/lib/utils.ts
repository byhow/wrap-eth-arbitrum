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

export const truncateTo7Digits = (num: number) => {
  let str = num.toString();
  if (str.length > 7) {
    const decimalIndex = str.indexOf(".");
    const decimalPlaces =
      decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
    const totalPlaces = 7;
    const placesAfterDecimal = Math.max(
      0,
      totalPlaces - (str.length - decimalPlaces)
    );
    str = num.toFixed(placesAfterDecimal);
  }
  str = parseFloat(str).toString();
  return str;
};