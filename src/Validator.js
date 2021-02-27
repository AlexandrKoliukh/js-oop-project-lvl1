import _ from 'lodash';
import StringSchema from './schemas/StringSchema';
import NumberSchema from './schemas/NumberSchema';
import ArraySchema from './schemas/ArraySchema';
import ObjectSchema from './schemas/ObjectSchema';

export default class Validator {
  constructor() {
    this.validatorsPerSchema = {
      string: {
        required(value) {
          return _.isString(value) && !_.isEmpty(value) && !_.isNil(value);
        },
        minLength(value, length) {
          return value.length >= length;
        },
        contains(value, substring) {
          return value.includes(substring);
        },
      },
      number: {
        required(value) {
          return _.isNumber(value) && !_.isNil(value);
        },
        positive(value) {
          return value > 0 || _.isNil(value);
        },
        range(value, min, max) {
          return value >= min && value <= max;
        },
      },
      array: {
        array(value) {
          return Array.isArray(value);
        },
        required(value) {
          return !_.isEmpty(value);
        },
        sizeof(value, length) {
          return value.length === length;
        },
      },
      object: {
        shape(obj, shape) {
          // eslint-disable-next-line no-restricted-syntax
          for (const [key, validator] of _.entries(shape)) {
            const value = obj[key];
            if (!validator.isValid(value)) {
              return false;
            }
          }
          return true;
        },
      },
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
          Object.keys(this.validatorsPerSchema)
        )}`
      );
    }

    targetSchema[validatorName] = validateFn;
  }
}
