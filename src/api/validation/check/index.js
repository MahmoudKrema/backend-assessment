// import Validations from "../index.js";
import Validator from "./helpers.js";
import { body, check } from "express-validator";


export default class CheckValidator {

    constructor() {

    }

    create() {
        
        const validations = [];

        validations.push(Validator.name("name"));

        validations.push(Validator.name("url"));

        validations.push(body('interval').optional().notEmpty().isNumeric().withMessage('This field must be a number'));

        validations.push(body('timeout').optional().notEmpty().isNumeric().withMessage('This field must be a number'));

        validations.push(body('threshold').optional().notEmpty().isNumeric().withMessage('This field must be a number'));

        validations.push(body('tags.*').optional().notEmpty().isString().withMessage('Tags must be an array of strings'));

        validations.push(body('authentication.username').optional().notEmpty().isString().withMessage('Authentication username must be a string'));

        validations.push(body('authentication.password').optional().notEmpty().isString().withMessage('Authentication password must be a string'));

        validations.push(body('path').optional().notEmpty().isString().withMessage('Path is required and must be a string'));

        validations.push(body('ignoreSSL').optional().notEmpty().isBoolean().withMessage('Ignore SSL must be a boolean'));

        validations.push(body('assert.statusCode').optional().notEmpty().isNumeric().withMessage('Assert status code must be a number'));

        validations.push(body('webhook').optional().notEmpty().isString().withMessage('Webhook must be a string or null'));
        

        return validations;
    }

    update() {
        
        const validations = [];

        validations.push(body('name').optional().notEmpty().isString().withMessage('Path is required and must be a string'));

        validations.push(body('url').optional().notEmpty().isString().withMessage('Path is required and must be a string'));

        validations.push(body('interval').optional().notEmpty().isNumeric().withMessage('This field must be a number'));

        validations.push(body('timeout').optional().notEmpty().isNumeric().withMessage('This field must be a number'));

        validations.push(body('threshold').optional().notEmpty().isNumeric().withMessage('This field must be a number'));

        validations.push(body('tags.*').optional().notEmpty().isString().withMessage('Tags must be an array of strings'));

        validations.push(body('authentication.username').optional().notEmpty().isString().withMessage('Authentication username must be a string'));

        validations.push(body('authentication.password').optional().notEmpty().isString().withMessage('Authentication password must be a string'));

        validations.push(body('path').optional().notEmpty().isString().withMessage('Path is required and must be a string'));

        validations.push(body('ignoreSSL').optional().notEmpty().isBoolean().withMessage('Ignore SSL must be a boolean'));

        validations.push(body('assert.statusCode').optional().notEmpty().isNumeric().withMessage('Assert status code must be a number'));

        validations.push(body('webhook').optional().notEmpty().isString().withMessage('Webhook must be a string or null'));
        

        return validations;
    }


}
