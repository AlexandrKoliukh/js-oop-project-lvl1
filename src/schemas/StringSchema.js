import _ from 'lodash';
import { BaseSchema } from './BaseSchema';

const checkers = {
  required(string) {
    return !_.isEmpty(string);
  },
  contains(string, substring) {
    return string.includes(substring);
  },
  minLength(string, length) {
    return string.length >= length;
  },
};

export default class StringSchema extends BaseSchema {
  required() {
    this.addValidator(checkers.required);
    return this;
  }

  contains(substring) {
    this.addValidator(checkers.contains, substring);
    return this;
  }

  minLength(length) {
    this.addValidator(checkers.minLength, length);
    return this;
  }
}
