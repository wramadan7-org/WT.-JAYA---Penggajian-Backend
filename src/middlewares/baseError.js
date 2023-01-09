class BaseError extends Error {
  constructor(message, statusCode, stack, isOperational = false) {
    super(stack);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
