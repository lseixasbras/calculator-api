const CalculatorService = require('../src/services/calculator.service');

describe("Calculator Tests", () => {
    let calculatorService
    beforeAll(() => {
        calculatorService = new CalculatorService();
      });

    test("Addition of 2 numbers", () => {
        // arrange and act
        var result = calculatorService.calculate("1+1")

        // assert
        expect(result).toBe(2);
    });

    test("Subtraction of 2 numbers", () => {
        var result = calculatorService.calculate("10-8")

        expect(result).toBe(2);
    });

    test("Multiplication of 2 numbers", () => {
        var result = calculatorService.calculate("2*8")

        expect(result).toBe(16);
    });

    test("Division of 2 numbers", () => {
        var result = calculatorService.calculate("24/8")

        expect(result).toBe(3);
    });
})