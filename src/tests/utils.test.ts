import { isNonNullAddress } from '@/lib/utils';

describe('isNonNullAddress', () => {
  it('should return true for valid Ethereum addresses', () => {
    const validAddress = '0x2cc017e8cd08a2f949fc0a1903ea21a8387f2834';
    expect(isNonNullAddress(validAddress)).toBe(true);
  });

  it('should return false for invalid Ethereum addresses', () => {
    const invalidAddress = '0x123';
    expect(isNonNullAddress(invalidAddress)).toBe(false);
  });

  it('should return false for null', () => {
    expect(isNonNullAddress(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isNonNullAddress(undefined)).toBe(false);
  });

  it('should return false for non-string values', () => {
    expect(isNonNullAddress(123)).toBe(false);
    expect(isNonNullAddress({})).toBe(false);
    expect(isNonNullAddress([])).toBe(false);
  });
});