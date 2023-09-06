/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Entry point to our main routes.
| Each route might contain multiple endpoints defined in their corresponding files.
|
*/

import { Router } from "express";

// Routes
import user from "./user/index.js";
import check from "./check/index.js";



const router = Router();

/*-------------------------------------------------------------------------*/
// API Routes
/*-------------------------------------------------------------------------*/
router.use("/users", user);
router.use("/checks", check);



export default router;
