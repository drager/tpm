'use strict';

const inherits = require('util').inherits;

function BadFormatError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

inherits(BadFormatError, Error);

module.exports = BadFormatError;
