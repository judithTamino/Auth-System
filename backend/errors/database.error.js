import CustomError from "./custom.error.js";

class DatabaseError extends CustomError {
  constructor(message = "Database Error.") {
    super(message, 500);
  }
}

export default DatabaseError;