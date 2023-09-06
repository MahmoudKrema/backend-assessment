import { body, check } from "express-validator";
import { userService } from "../../../services/user/index.js";

export default class UserValidator {


    static idValidation(idFieldName) {

        return check(idFieldName)
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage("This field is missed");
    }

    static name(fieldName, options = { minChars: 1 }) {
        
        const { minChars } = options;

        return body(fieldName)
            .exists()
            .withMessage("This field is missed")
            .isLength({ min: minChars })
            .withMessage(`This field must be at least ${minChars} chars long`);
    }
    

    static passwordSignUp(fieldName, options = { minChars: 1 }) {
        
        const { minChars } = options;

        return body(fieldName)
            .exists()
            .withMessage("This field is missed")
            .isLength({ min: minChars })
            .withMessage(`This field must be at least ${minChars} chars long`)
            .matches(/\d/).withMessage('Password must contain at least one digit')
    }

    static passwordSignIn(fieldName) {

        return body(fieldName)
            .exists()
            .withMessage("This field is missed")
            .isLength({ min: 1 })
            .withMessage(`This field must not be empty`)
    }

    static namesPatchValidation(fieldName, options = { minChars: 1 }) {
        
        const { minChars } = options;
        
        return body(fieldName)
            .if(body(fieldName).exists())
            .isLength({ min: minChars })
            .withMessage(`This field must be at least ${minChars} chars long`);
    }


    static emailSignIn(fieldName) {

        return body(fieldName)
            .exists()
            .withMessage("This field is missed")
            .isEmail().
            withMessage('Invalid email format')
            .custom(UserValidator.doesEmailExist)
            .withMessage(`The email doesn't exists`)
    }

    static async doesEmailExist (email) {

        const emailExists = await userService.doesEmailExist(email);

                if (!emailExists) {

                    throw new Error(`The email (${email}) doesn't exists`);
                }

                return true;
    }

    static emailSignUp(fieldName) {
    
        return body(fieldName)
            .exists()
            .withMessage("This field is missed")
            .isEmail().
            withMessage('Invalid email format')
            .custom(UserValidator.isEmailUnique)
            .withMessage(`This email already exists`)
    }

    static async isEmailUnique (email) {

        const emailExists = await userService.doesEmailExist(email);

                if (emailExists) {

                    throw new Error(`the email (${email}) already exists`);
                }

                return true;
    }

    // static emailExists (idField) {

    //     return body(idField)

    //         .custom(async (email) => {

    //             const emailExists = await userService.doesEmailExist(email);

    //             if (!emailExists) {

    //                 throw new Error(`the email (${email}) doesn't exists`);
    //             }

    //             return true;
    //         });
    // }
}
