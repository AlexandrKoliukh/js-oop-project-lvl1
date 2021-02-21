import { test, expect } from '@jest/globals';
import Validator from '../src/Validator';

test('String', () => {
  const v = new Validator();
  const schema = v.string();

  expect(schema.isValid('')).toBe(true);

  schema.required();

  expect(schema.isValid('what does the fox say')).toBe(true);
  expect(schema.isValid('hexlet')).toBe(true);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid('')).toBe(false);

  expect(schema.contains('what').isValid('what does the fox say')).toBe(true);
  expect(schema.contains('whatthe').isValid('what does the fox say')).toBe(
    false
  );
});

test('Number', () => {
  const v = new Validator();

  const schema = v.number();

  expect(schema.isValid(null)).toBe(true); // true

  schema.required();

  expect(schema.isValid(null)).toBe(false); // false
  expect(schema.isValid(7)).toBe(true); // true

  expect(schema.positive().isValid(10)).toBe(true); // true

  schema.range(-5, 5);

  expect(schema.isValid(-3)).toBe(false); // false
  expect(schema.isValid(5)).toBe(true); // true
});

test('Array', () => {
  const v = new Validator();

  const schema = v.array();

  expect(schema.isValid(null)).toBe(false); // false

  schema.required();

  expect(schema.isValid([])).toBe(true); // true
  expect(schema.isValid(['hexlet'])).toBe(true); // true

  schema.sizeof(2);

  expect(schema.isValid(['hexlet'])).toBe(false); // false
  expect(schema.isValid(['hexlet', 'code-basics'])).toBe(true); // true
});

test('Object', () => {
  const v = new Validator();

  const schema = v.object();

  // Позволяет описывать валидацию для свойств объекта
  schema.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });

  expect(schema.isValid({ name: 'kolya', age: 100 })).toBe(true); // true
  expect(schema.isValid({ name: 'maya', age: null })).toBe(true); // true
  expect(schema.isValid({ name: '', age: null })).toBe(false); // false
  expect(schema.isValid({ name: 'ada', age: -5 })).toBe(false); // false
});
