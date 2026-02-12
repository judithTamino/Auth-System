import {CustomError} from "./custom.error.js";

export class DatabaseError extends CustomError {
  constructor(message = "Database Error.") {
    super(message, 500);
  }
}