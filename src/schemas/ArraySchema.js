import { BaseSchema } from './BaseSchema';

const checkers = {
  required(value) {
    return Array.isArray(value);
  },
  sizeof(value, length) {
    return value.length === length;
  },
};

export default class ArraySchema extends BaseSchema {
  constructor() {
    super();
    this.addValidator(checkers.required);
  }

  required() {
    // this.addValidator();
    return this;
  }

  sizeof(length) {
    this.addValidator(checkers.sizeof, length);
    return this;
  }
}
