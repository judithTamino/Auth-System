import CustomError from "./custom.error.js";

class ValidationError extends CustomError {
  constructor(message = "Validation Error.", errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

export default ValidationError;