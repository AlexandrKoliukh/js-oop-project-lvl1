import _ from 'lodash';
import { BaseSchema } from './BaseSchema';

const checkers = {
  required(value) {
    return _.isNumber(value);
  },
  positive(value) {
    return value > 0;
  },
  range(value, min, max) {
    return value >= min && value <= max;
  },
};

export default class NumberSchema extends BaseSchema {
  required() {
    this.addValidator(checkers.required);
    return this;
  }

  positive() {
    this.addValidator(checkers.positive);
    return this;
  }

  range(min, max) {
    this.addValidator(checkers.range, min, max);
    return this;
  }
}
