import _ from 'lodash';

export const string = {
  required(value) {
    return _.isString(value) && !_.isEmpty(value) && !_.isNil(value);
  },
  minLength(value, length) {
    return value.length >= length;
  },
  contains(value, substring) {
    return value.includes(substring);
  },
};

export const number = {
  required(value) {
    return _.isNumber(value) && !_.isNil(value);
  },
  positive(value) {
    return value > 0 || _.isNil(value);
  },
  range(value, min, max) {
    return value >= min && value <= max;
  },
};

export const array = {
  array(value) {
    return Array.isArray(value);
  },
  required(value) {
    return !_.isEmpty(value);
  },
  sizeof(value, length) {
    return value.length === length;
  },
};

export const object = {
  shape(obj, shape) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, validator] of _.entries(shape)) {
      const value = obj[key];
      if (!validator.isValid(value)) {
        return false;
      }
    }
    return true;
  },
};
