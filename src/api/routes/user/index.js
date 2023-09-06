import express from "express";
import UserController from "../../controllers/user/index.js";
import UserValidator from "../../validation/user/index.js";
import authenticateToken from "../../middlewares/authMiddleware.js";

const userController = new UserController();

const userValidator = new UserValidator();


const router = express.Router();

// router.post("/sign-up", userValidator.signUp(), userController.signUp);

router.post("/sign-up", userValidator.signUp(), userController.signUp);

router.get("/verify/:token", userController.verifyEmail);

router.post("/sign-in", userValidator.signIn(), userController.signIn);


export default router;
