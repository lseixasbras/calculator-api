const express = require('express');
const router = express.Router();

const CalculatorController = require('../controllers/calculator.controller');

const calculatorController = new CalculatorController();

//@route    GET /calculus?query=[input]
//@desc     Receives input query enconded as Base64
//@return   Calculated number
router.get('/calculus', (req, res, next)=> calculatorController.calculate(req,res,next))

module.exports = router;