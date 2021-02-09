import { test, expect } from '@jest/globals';
import Validator from '../src/Validator';

test('Validator', () => {
  const v = new Validator();
  const schema = v.string();

  expect(schema.isValid('')).toBe(true);

  schema.required();

  expect(schema.isValid('what does the fox say')).toBe(true);
  expect(schema.isValid('hexlet')).toBe(true);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid('')).toBe(false);

  expect(schema.contains('what').isValid('what does the fox say')).toBe(true);
  expect(schema.contains('whatthe').isValid('what does the fox say')).toBe(false);
});
