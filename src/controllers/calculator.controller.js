const HttpError = require('../DTOS/http-error');
const CalculatorService = require('../services/calculator.service');

class CalculatorController {
  constructor() {
    this.calculatorService = new CalculatorService();

  }
  calculate(req, res, next) {
    const { query } = req.query;

    if (!query) {
      const error = new HttpError("Server error: Query param cannot be undefined",500);
      return next(error);
    }

    //Decode Query
    const bufferQuery = Buffer.from(query, 'base64') 
    const decodedQuery = bufferQuery.toString('utf8')

    //Remove spaces from Query
    const decodedQueryNoSpaces = decodedQuery.replace( /\s/g, '')

    const regexQuery = /^[0-9*+-/()]+$/g
    const queryValidation = regexQuery.test(decodedQueryNoSpaces)

    if (!queryValidation) {
      const error = new HttpError("Server error: Query param operations not supported",500);
      return next(error);
    }

    try {
 
      const result = this.calculatorService.calculate(decodedQueryNoSpaces)

      return res.status(200).json({ error: false, result: result });
    } catch (err) {
      return next(
        new HttpError(
          `Server error: ${err.message ? err.message : ''} `,
          err.code,
        )
      );
    }
  }

}

module.exports = CalculatorController;
