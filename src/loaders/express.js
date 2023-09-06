/*
|--------------------------------------------------------------------------
| Express
|--------------------------------------------------------------------------
|
| Starting Express server with all the required configurations.
|
*/

import express from "express";
import routes from "../api/routes/index.js";
import cors from "cors";
import config from "../config/index.js";


const app = express();

// Support JSON-encoded bodies and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({ origin: config.cors, optionsSuccessStatus: 200 }));

// Routes
app.use("/api", routes);


// makeing public folder accessible 
app.use("/public", express.static("public"));


export default app;
