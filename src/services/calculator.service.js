class CalculatorService {
  constructor() {
  }

  calculate(operation) {
    try {
        const operationResult = eval(operation)
        return operationResult;
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

module.exports = CalculatorService;
