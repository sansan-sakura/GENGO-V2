import {
  createDeck,
  deleteDeck,
  getAllDatesOfDeck,
  getAllDecks,
  getDatesOfDeck,
  getDeck,
  getDecksByCategory,
  updateDeck,
} from "../controllers/deckController";
import {} from "../middleware/auth";
import express from "express";

const router = express.Router();

router.route("/").get(getAllDecks).post(createDeck);
router.route("/date/category/:id").get(getDatesOfDeck);
router.route("/date").get(getAllDatesOfDeck);
router.route("/category/:id").get(getDecksByCategory);

router.route("/:id").get(getDeck).delete(deleteDeck).put(updateDeck);
export { router };
