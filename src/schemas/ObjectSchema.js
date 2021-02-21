import _ from 'lodash';
import { BaseSchema } from './BaseSchema';

const checkers = {
  shape(object, schema) {
    for (const [key, value] of _.entries(object)) {
      const validator = schema[key];
      if (!validator.isValid(value)) {
        return false;
      }
    }
    return true;
  },
};

export default class ObjectSchema extends BaseSchema {
  shape(objectSchema) {
    this.addValidator(checkers.shape, objectSchema);
    return this;
  }
}
