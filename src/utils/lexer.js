const TokenTypes = {
    PLUS: "PLUS",
    MINUS: "MINUS",
    MULTIPLY:"MULTIPLY",
    DIVIDE: "DIVIDE",
    INTEGER:"INTEGER",
    L_PAREN: "L_PAREN",
    R_PAREN: "R_PAREN",
    EOF:"EOF"
}

class Lexer {
    #stream = "";
    #cursor = 0;

    constructor(){}

    #at (){
        return this.#stream[this.#cursor]
    }

    tokenize (input = ""){
        this.#stream = input;
        this.#cursor = 0;

        const tokens = [];

        //continue through no chars
        while (this.#cursor < this.#stream.length){
            switch (this.#at()) {
                case ' ':
                case '\n':
                case '\t': 
                    break;
                case '+':
                    tokens.push({type: TokenTypes.PLUS, value: "+"})
                    break;
                case '-':
                    tokens.push({type: TokenTypes.MINUS, value: "-"})
                    break;
                case '*':
                    tokens.push({type: TokenTypes.MULTIPLY, value: "*"})
                    break;
                case '/':
                    tokens.push({type: TokenTypes.DIVIDE, value: "/"})
                    break;
                case '(':
                    tokens.push({type: TokenTypes.L_PAREN, value: "("})
                    break;
                case ')':
                    tokens.push({type: TokenTypes.R_PAREN, value: ")"})
                    break;    
                default:
                    // check for numeric value
                    if(isNumeric(this.#at())){
                        let strNumber = "";

                        while(isNumeric(this.#at())){
                            strNumber += this.#at();
                            this.#cursor++;
                        }

                        tokens.push({type: TokenTypes.INTEGER, value: parseInt(strNumber)});
                        this.#cursor--;
                    } else{
                        throw new Error(`Expeceted a valid token at position: ${this.#cursor} instead received: ${this.#at()}`);
                    }

                    break;
            }

            this.#cursor++;
        }

        tokens.push({type: TokenTypes.EOF, value:"EOF"});
        return tokens;
    }
}

function isNumeric (char = "") {
    let asciiNum = char.charCodeAt(0); 
    let isNum =  (asciiNum >= 48 && asciiNum <= 57);
    return isNum
}

module.exports = {
    Lexer, TokenTypes
}