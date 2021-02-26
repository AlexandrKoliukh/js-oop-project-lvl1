import BaseSchema from './BaseSchema';

export default class NumberSchema extends BaseSchema {
  constructor(...props) {
    super(...props);
    this.applyValidator('number');
  }

  required() {
    this.applyValidator('required');
    return this;
  }

  positive() {
    this.applyValidator('positive');
    return this;
  }

  range(min, max) {
    this.applyValidator('range', min, max);
    return this;
  }
}
