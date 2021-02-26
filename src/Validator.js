import StringSchema from './schemas/StringSchema';
import NumberSchema from './schemas/NumberSchema';
import ArraySchema from './schemas/ArraySchema';
import ObjectSchema from './schemas/ObjectSchema';
import {
  number, string, array, object,
} from './validators';

export default class Validator {
  constructor() {
    this.validatorsPerSchema = {
      string,
      number,
      array,
      object,
    };
  }

  string() {
    return new StringSchema(this.validatorsPerSchema.string);
  }

  number() {
    return new NumberSchema(this.validatorsPerSchema.number);
  }

  array() {
    return new ArraySchema(this.validatorsPerSchema.array);
  }

  object() {
    return new ObjectSchema(this.validatorsPerSchema.object);
  }

  addValidator(schema, validatorName, validateFn) {
    const targetSchema = this.validatorsPerSchema[schema];
    if (!targetSchema) {
      throw new Error(
        `Unsupported schema: ${schema}. Available schemas: ${JSON.stringify(
          Object.keys(this.validatorsPerSchema),
        )}`,
      );
    }

    targetSchema[validatorName] = validateFn;
  }
}
