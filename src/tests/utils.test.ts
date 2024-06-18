import { isNonNullAddress, truncateTo7Digits } from '@/lib/utils';
import { describe } from 'vitest';

describe('Utils', () => {
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

  describe('truncateTo7Digits', () => {
    it('should return the same number if it has less than 7 digits after the decimal point', () => {
      expect(truncateTo7Digits(123.456)).toBe('123.456');
      expect(truncateTo7Digits(123)).toBe('123');
    });

    it('should only return the number of total digits to exactly 7 digits', () => {
      expect(truncateTo7Digits(123.4567891)).toBe('123.457');
    });

    it('should not truncate the number if integer', () => {
      expect(truncateTo7Digits(1234567891)).toBe('1234567891');
    });
  });
})
