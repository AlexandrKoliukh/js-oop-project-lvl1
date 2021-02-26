import BaseSchema from './BaseSchema';

export default class StringSchema extends BaseSchema {
  constructor(...props) {
    super(...props);
    this.applyValidator('string');
  }

  required() {
    this.applyValidator('required');
    return this;
  }

  contains(substring) {
    this.applyValidator('contains', substring);
    return this;
  }

  minLength(length) {
    this.applyValidator('minLength', length);
    return this;
  }
}
