import { type Address, isAddress } from "viem";

/**
 * Checks if the given value is not null and a valid Ethereum address.
 * 
 * Note: The `isAddress` function from viem checks if the given value is a valid Ethereum address too.
 * For more information, see the [Viem.sh Documentation](https://viem.sh/docs/utilities/isAddress).
 * 
 * @param {unknown} value The value to check.
 * @returns A boolean indicating whether the value is a non-null Ethereum address.
 */
export function isNonNullAddress(value: unknown): value is Address {
  return typeof value === 'string' && isAddress(value);
}

/**
 * Truncates a number to 7 digits after the decimal point.
 * 
 * @param {Number} num The number to truncate.
 * @returns The truncated number as a string.
 */
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