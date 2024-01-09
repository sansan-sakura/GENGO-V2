import express from "express";

const router = express.Router();
import { createNewUser, updateUser, deleteUser } from "../controllers/userController";

router.post("/signup", createNewUser);
router.put("/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export { router };
