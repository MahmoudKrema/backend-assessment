/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
|
| Mapping environment variables and other configuration for easier access.
|
*/

import dotenv from "dotenv";

const env = dotenv.config();

// Handle a missing .env file
if (env.error) throw new Error("Couldn't fine .env file in project directory.");

const config = {

    /**
     * CORS
     */
    cors: "*",

    /**
     * Server port
     */
    port: parseInt(process.env.PORT, 10),
    
    host: process.env.HOST,
    
    mongodb: {

            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            hostname: process.env.DB_HOSTNAME,
            databaseName: process.env.DB_DATABASE,
    },

    jwtKey: process.env.JWT_KEY,

    email: {
        email: process.env.EMAIL,
        password: process.env.EMAIL_PASSWORD,
        service: process.env.EMAIL_SERVICE,
    }
    

};


export default config;
