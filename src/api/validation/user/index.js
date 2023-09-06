// import Validations from "../index.js";
import Validator from "./helpers.js";

export default class UserValidator {

    constructor() {

    }

    signUp() {
        
        const validations = [];

        validations.push(Validator.name("name"));

        validations.push(Validator.emailSignUp("email"));

        validations.push(Validator.passwordSignUp("password", {minChars: 8}));
        

        return validations;
    }

    signIn() {
        
        const validations = [];

        validations.push(Validator.emailSignIn("email"));   

        validations.push(Validator.passwordSignIn("password"));

    
        return validations;
    }


}
