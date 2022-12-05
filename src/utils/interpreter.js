class Interpreter {
    constructor(){}

    /**
    * Evaulate pure numeric operations with binary operators.
    */
     #eval_numeric_binary_expr(lhs,rhs,operator) {
        let result;
        if (operator == "+") {
        result = lhs.value + rhs.value;
        } else if (operator == "-") {
        result = lhs.value - rhs.value;
        } else if (operator == "*") {
        result = lhs.value * rhs.value;
        } else {
        result = lhs.value / rhs.value;
        }
    
        return { value: result, type: "number" };
    }

/**
* Evaulates expressions following the binary operation type.
*/
    #eval_binary_expr(binop) {
        const lhs = this.evaluate(binop.leftHandSide);
        const rhs = this.evaluate(binop.rightHandSide);
    
        // Only currently support numeric operations
        if (lhs.type == "number" && rhs.type == "number") {
            return this.#eval_numeric_binary_expr(lhs,rhs,binop.operator);
        }
    
        // One or both are NULL
        return { type: "null", value: "null" };
    }

    evaluate(ast) {
        switch (ast.type) {
          case "NumericLiteral":
            return {
              value: (ast.value),
              type: "number",
            };
          case "BinaryOperator":
            return this.#eval_binary_expr(ast);
      
          // Handle unimplimented ast types as error.
          default:
            throw new Error(`This AST Node has not yet been setup for interpretation. Received: ${JSON.stringify(ast)}`); 
        }
    }
}


module.exports = {Interpreter};