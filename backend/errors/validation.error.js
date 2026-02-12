import {CustomError} from "./custom.error.js";

export class ValidationError extends CustomError {
  constructor(message = "Validation Error.", errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}