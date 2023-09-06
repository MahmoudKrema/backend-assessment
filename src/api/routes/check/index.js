import express from "express";
import CheckController from "../../controllers/check/index.js";
import CheckValidator from "../../validation/check/index.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import verifyMail from "../../middlewares/verifyMail.js";

const checkController = new CheckController();

const checkValidator = new CheckValidator();


const router = express.Router();

router.get("/pollings", authenticateToken, verifyMail, checkController.getPollingsByFilter);

router.get("/:checkId", authenticateToken, verifyMail, checkController.get);

router.get("/:checkId/polling", authenticateToken, verifyMail, checkController.getCheckPolling);

router.get("/", authenticateToken, verifyMail, checkController.getAll);

router.post("/", authenticateToken, verifyMail, checkValidator.create(), checkController.create);

router.patch("/:checkId", authenticateToken, verifyMail, checkValidator.update(), checkController.update);

router.delete("/:checkId", authenticateToken, verifyMail, checkController.delete);


export default router;
