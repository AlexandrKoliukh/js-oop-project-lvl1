export class BaseSchema {
  constructor() {
    this.validators = [];
  }

  isValid(item) {
    for (const [validateFunc, data] of this.validators) {
      if (!validateFunc(item, ...data)) return false;
    }

    return true;
  }

  addValidator(validateFunc, ...data) {
    this.validators = [[validateFunc, data]].concat(this.validators);
  }
}
