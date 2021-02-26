import BaseSchema from './BaseSchema';

export default class ArraySchema extends BaseSchema {
  constructor(...props) {
    super(...props);
    this.applyValidator('array');
  }

  required() {
    this.applyValidator('required');
    return this;
  }

  sizeof(length) {
    this.applyValidator('sizeof', length);
    return this;
  }
}
