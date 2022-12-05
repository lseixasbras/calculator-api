const CalculatorService = require('../src/services/calculator.service');

describe("Calculator Tests", () => {
    let calculatorService
    beforeAll(() => {
        calculatorService = new CalculatorService();
      });

    test("Addition of 2 numbers", () => {
        // arrange and act
        var result = calculatorService.calculate("1 + 1")

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

    test("Invalid Operation", () => {
         expect(() => {
            calculatorService.calculate("1+1/()")
          }).toThrow();
    });

    test("Infinite Operation", () => {
        var result = calculatorService.calculate("10/0")
        expect(result).toBe(Infinity);
   });

   test("Addition of 2 numbers v2", () => {
        var result = calculatorService.calculate2("1 + 1")
        expect(result).toBe(2);
    });

    test("Subtraction of 2 numbers v2", () => {
        var result = calculatorService.calculate2("10-8")

        expect(result).toBe(2);
    });

    test("Multiplication of 2 numbers v2", () => {
        var result = calculatorService.calculate2("2*8")

        expect(result).toBe(16);
    });

    test("Division of 2 numbers v2", () => {
        var result = calculatorService.calculate2("24/8")

        expect(result).toBe(3);
    });

    test("Invalid Operation v2", () => {
        expect(() => {
            calculatorService.calculate2("1+1/()")
        }).toThrow();
    }); 

   test("Infinite Operation v2", () => {
        var result = calculatorService.calculate2("10/0")
        expect(result).toBe(Infinity);
    });
})