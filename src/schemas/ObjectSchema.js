import BaseSchema from './BaseSchema';

export default class ObjectSchema extends BaseSchema {
  shape(objectSchema) {
    this.applyValidator('shape', objectSchema);
    return this;
  }
}
