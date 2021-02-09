export default class Validator {
  schemaContains = '';

  constructor() {}

  string() {
    this.schemaType = 'string';

    return this;
  }

  contains(item) {
    this.schemaContains = item;

    return this;
  }

  required() {
    this.schemaRequired = true;

    return this;
  }

  isValid(item) {
    let isValid = true;

    if (this.schemaType !== typeof item) {
      return false;
    }
    if (!item.includes(this.schemaContains)) {
      return false;
    }
    if (this.schemaRequired && !item) {
      return false;
    }

    return isValid;
  }
}
