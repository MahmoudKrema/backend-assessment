import bcrypt from 'bcryptjs';

export default class Hashing {
    
    
    static async hashPassword(password) {

        try {
            const saltRounds = 10; // Number of salt rounds for bcrypt
        
            // Generate a salt and hash the password
            const hash = await bcrypt.hash(password, saltRounds);
        
            return hash;
          } catch (error) {
            throw new Error('Error hashing password');
          }
    }

    static async comparePasswords(enteredPassword, hashedPassword) {

      try {

        const result = await bcrypt.compare(enteredPassword, hashedPassword);

        return result;
        
      } catch (error) {
        // Handle error, such as logging or responding with an error message
        console.error(error);
        throw error;
      }
    }
}
