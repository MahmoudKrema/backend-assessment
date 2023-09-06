import { body, check } from "express-validator";

export default class Validator {


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

    static email(fieldName) {
    
        return body(fieldName)
            .exists()
            .withMessage("This field is missed")
            .isEmail().
            withMessage('Invalid email format')
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


    static isEmailUnique(idField, service) {

        return body(idField)

            .custom(async (idValue) => {

                const parentExists = await service.doesRowExist(idValue);


                if (parentExists) {

                    throw new Error(`${idField}: ${idValue} is not unique`);
                }

                return true;
            });
    }
}
