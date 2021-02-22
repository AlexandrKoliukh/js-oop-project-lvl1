import StringSchema from './schemas/StringSchema';
import NumberSchema from './schemas/NumberSchema';
import ArraySchema from './schemas/ArraySchema';
import ObjectSchema from './schemas/ObjectSchema';

export default class Validator {
  string() {
    return new StringSchema();
  }

  number() {
    return new NumberSchema();
  }

  array() {
    return new ArraySchema();
  }

  object() {
    return new ObjectSchema();
  }
}
