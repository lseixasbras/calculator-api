const {TokenTypes} = require("./lexer");

class Parser {
    #tokens = [];
    #cursor = 0;

    #at(){
        return this.#tokens[this.#cursor];
    }

    #peak(n=1){
        return this.#tokens[this.#cursor + n];
    }

    #eatToken (tokenType){
        if(tokenType == this.#at().type)
            this.#cursor++
        else
            throw Error(`Expected a token to be of type: ${tokenType} instead received: ${this.#at().type}`)
    }

    constructor(tokens){
        this.#tokens = tokens; 
    }

    parse(){
        return this.#parse_expression();
    }

    //parse addition/subtraction
    #parse_expression(){
        let leftHandSide = this.#parse_term();

        while(this.#at().type == TokenTypes.PLUS || this.#at().type == TokenTypes.MINUS){
            const operator = this.#at().value;
            const ttype = (this.#at().type == TokenTypes.PLUS)? TokenTypes.PLUS : TokenTypes.MINUS;
            this.#eatToken(ttype);
            let rhs = this.#parse_term();
            leftHandSide = {type: "BinaryOperator", operator, leftHandSide, rightHandSide: rhs};
        }

        return leftHandSide;
    }

    //multiplication/division
    #parse_term(){
        let leftHandSide = this.#parse_factor();

        while(this.#at().type == TokenTypes.MULTIPLY || this.#at().type == TokenTypes.DIVIDE){
            const operator = this.#at().value;
            const ttype = (this.#at().type == TokenTypes.DIVIDE)? TokenTypes.DIVIDE : TokenTypes.MULTIPLY;
            this.#eatToken(ttype);
            let rhs = this.#parse_factor();
            leftHandSide = {type: "BinaryOperator", operator, leftHandSide, rightHandSide: rhs};
        }

        return leftHandSide;
    }

    //Highest precidence
    #parse_factor(){
        
        if(this.#at().type == TokenTypes.INTEGER){
            let literal =  {type: "NumericLiteral", value: this.#at().value};
            this.#eatToken(TokenTypes.INTEGER);
            return literal;
        }   

        //parenthesised expression?
        if (this.#at().type == TokenTypes.L_PAREN) {
            this.#eatToken(TokenTypes.L_PAREN);
            let expr = this.#parse_expression();
            this.#eatToken(TokenTypes.R_PAREN);
            return expr;
        }

        throw Error(`Expected a Parenthesis token or a integer in input instead received: ${JSON.stringify(this.#at())}`)
    }
}

module.exports = {Parser}