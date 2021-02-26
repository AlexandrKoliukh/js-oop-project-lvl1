/* eslint-disable */
import { test, expect } from '@jest/globals';
import Validator from '../src/Validator';

test('String', () => {
  const v = new Validator();
  const schema = v.string();

  expect(schema.isValid('')).toBe(true);
  expect(schema.isValid(null)).toBe(true);

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

  expect(schema.isValid(null)).toBe(true);
  expect(schema.isValid(0)).toBe(true);

  schema.required();

  expect(schema.isValid(7)).toBe(true);
  expect(schema.isValid(7 + 123)).toBe(true);
  expect(schema.isValid(null)).toBe(false);

  schema.range(-5, 5);

  expect(schema.isValid(-3)).toBe(true);
  expect(schema.isValid(5)).toBe(true);

  schema.positive();

  expect(schema.isValid(-3)).toBe(false);
});

test('Array', () => {
  const v = new Validator();
  const schema = v.array();

  expect(schema.isValid([])).toBe(true);
  expect(schema.isValid(null)).toBe(false);

  schema.required();

  expect(schema.isValid(['hexlet'])).toBe(true);
  expect(schema.isValid([])).toBe(false);

  schema.sizeof(2);

  expect(schema.isValid(['hexlet', 'code-basics'])).toBe(true);
  expect(schema.isValid(['hexlet'])).toBe(false);
});

test('Object', () => {
  const v = new Validator();
  const schema = v.object();

  schema.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });

  expect(schema.isValid({ name: '123' })).toBe(true);
  expect(schema.isValid({ name: 'kolya', age: 100 })).toBe(true);
  expect(schema.isValid({ name: 'maya', age: null })).toBe(true);
  expect(schema.isValid({})).toBe(false);
  expect(schema.isValid({ name: '', age: null })).toBe(false);
  expect(schema.isValid({ name: 'ada', age: -5 })).toBe(false);
});

describe('Custom', () => {
  test('base', () => {
    const v = new Validator();
    const fn = (value, start) => value.startsWith(start);
    v.addValidator('string', 'startWith', fn);

    const schema = v.string().test('startWith', 'H');

    expect(schema.isValid('Hexlet')).toBe(true);
    expect(schema.isValid('exlet')).toBe(false);
  });

  test('multi args', () => {
    const v = new Validator();
    const fn = (value, start, end) =>
      value.length > start && value.length < end;
    v.addValidator('string', 'range', fn);

    const schema = v.string().test('range', 5, 8);

    expect(schema.isValid('Hexlet')).toBe(true);
    expect(schema.isValid('exlet')).toBe(false);
    expect(schema.isValid('Hexlet123')).toBe(false);
  });

  test('error', () => {
    const v = new Validator();
    const fn = (value) => value === false;

    expect(() => {
      v.addValidator('boolean', 'isFalse', fn);
    }).toThrow();
  });
});
