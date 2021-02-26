export default class BaseSchema {
  constructor(validators) {
    this.validators = validators;
    this.appliedValidators = [];
  }

  isValid(item) {
    // eslint-disable-next-line no-restricted-syntax
    for (const { validate, data } of this.appliedValidators) {
      if (!validate(item, ...data)) return false;
    }

    return true;
  }

  applyValidator(validatorName, ...data) {
    const validate = this.validators[validatorName];
    this.appliedValidators.push({ validate, data });
  }

  test(validatorName, ...data) {
    this.applyValidator(validatorName, ...data);
    return this;
  }
}
