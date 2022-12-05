const {Lexer} = require("../utils/lexer")
const {Parser} = require("../utils/parser")
const {Interpreter} = require("../utils/interpreter")
const util = require("util");

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

  calculate2(operation) {
    const lexer = new Lexer();
    const tokens = lexer.tokenize(operation);

    const parser = new Parser(tokens);
    const ast = parser.parse();

     console.log(util.inspect(ast, {showHidden: false, depth: null, colors: true}))

    const interpreter = new Interpreter();
    let result = interpreter.evaluate(ast)

    return result.value
  }
}

module.exports = CalculatorService;
