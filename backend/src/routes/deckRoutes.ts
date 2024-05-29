import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import {
  createDeck,
  deleteDeck,
  getAllDatesOfDeck,
  getAllDecks,
  getDatesOfDeck,
  getDeck,
  getDecksByCategory,
  updateDeck,
} from '../controllers/deckController';

import express from 'express';

const router = express.Router();

router.route('/').get(ClerkExpressWithAuth(), getAllDecks).post(ClerkExpressWithAuth(), createDeck);
router.route('/date/category/:id').get(ClerkExpressWithAuth(), getDatesOfDeck);
router.route('/date').get(ClerkExpressWithAuth(), getAllDatesOfDeck);
router.route('/category/:id').get(ClerkExpressWithAuth(), getDecksByCategory);

router
  .route('/:id')
  .get(ClerkExpressWithAuth(), getDeck)
  .delete(ClerkExpressWithAuth(), deleteDeck)
  .put(ClerkExpressWithAuth(), updateDeck);
export { router };
