//const HttpError = require('../DTOS/http-error');

class CalculatorService {
  constructor() {
  }

  calculate(operation) {

    const operationResult = eval(operation)
    return operationResult;
  }

}

module.exports = CalculatorService;
