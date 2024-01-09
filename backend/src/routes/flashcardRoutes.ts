import express from "express";

const router = express.Router();
import {
  createFlashcard,
  deleteFlashcard,
  getAllFlashcards,
  getFlashcard,
  updateFlashcard,
} from "../controllers/flashcardController";
// import { authenticateUser } from "../middleware/auth";

router.route("/").get(getAllFlashcards).post(createFlashcard);

router.route("/:id").get(getFlashcard).delete(deleteFlashcard).put(updateFlashcard);

export { router };
