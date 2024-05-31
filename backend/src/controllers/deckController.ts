import { Request, Response, NextFunction } from 'express';
import { Deck } from '../models/deckModel';
import mongoose from 'mongoose';
import { catchAsync } from '../utils/catchAsync';
import { APIFeatures } from '../utils/apiFeature';
import { AppError } from '../utils/appError';
import clerkClient, { WithAuthProp } from '@clerk/clerk-sdk-node';

export const getAllDecks = catchAsync(
  async (req: WithAuthProp<Request>, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));

    const id = req.body.id;
    const user = await clerkClient.users.getUser(req.auth.userId);

    const features = new APIFeatures(
      Deck.find({ user: user.id }).populate('cards').populate('category'),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const deck = await features.query;

    res.status(200).json({
      status: '200',
      results: deck.length,
      data: { deck },
    });
  }
);

export const getDatesOfDeck = catchAsync(
  async (req: WithAuthProp<Request>, res: Response, next: NextFunction) => {
    const features = new APIFeatures(
      Deck.find({ category: new mongoose.Types.ObjectId(req.params.id), user: req.auth.userId })
        // .populate('category')
        // .populate('cards')
        .select({
          createdAt: 1,
          last_reviewed_date: 1,
          reviewed_date: 1,
        }),
      req.query
    );

    const deck = await features.query;

    res.status(200).json({
      status: '200',
      results: deck.length,
      data: { deck },
    });
  }
);

export const getAllDatesOfDeck = catchAsync(
  async (req: WithAuthProp<Request>, res: Response, next: NextFunction) => {
    const features = new APIFeatures(
      Deck.find({ id: req.auth.userId }).populate('category').populate('cards').select({
        createdAt: 1,
        last_reviewed_date: 1,
        reviewed_date: 1,
      }),
      req.query
    );

    const deck = await features.query;

    res.status(200).json({
      status: '200',
      results: deck.length,
      data: { deck },
    });
  }
);

export const getDecksByCategory = catchAsync(
  async (req: WithAuthProp<Request>, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    const searchObj =
      req.params.id === 'all' ? {} : { category: new mongoose.Types.ObjectId(req.params.id) };
    const features = new APIFeatures(
      Deck.find({ category: new mongoose.Types.ObjectId(req.params.id) })
        .populate('category')
        .populate('cards'),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const deck = await features.query;

    res.status(200).json({
      status: '200',
      results: deck.length,
      data: { deck },
    });
  }
);

export const createDeck = catchAsync(
  async (req: WithAuthProp<WithAuthProp<Request>>, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    console.log('cretaeee');
    const user = await clerkClient.users.getUser(req.auth.userId);
    const { title, category } = req.body;
    const body =
      category === 'all' || !category
        ? { title: title, user: user.id }
        : { title: title, user: user.id, category: category };
    const newDeck = await Deck.create(body);
    console.log(newDeck);
    res.status(201).json({
      status: 'success',
      data: {
        newDeck,
      },
    });
  }
);

export const getDeck = catchAsync(
  async (req: WithAuthProp<Request>, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    const deck = await Deck.findById(req.params.id).populate('category').populate('cards');
    res.status(201).json({
      status: 'success',
      cards: deck.cards,
      data: {
        deck,
      },
    });
  }
);

export const deleteDeck = catchAsync(
  async (req: WithAuthProp<Request>, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    const deletedDeck = await Deck.findByIdAndDelete(req.params.id);
    res.json({
      status: 'success',
      data: null,
    });
  }
);

export const updateDeck = catchAsync(
  async (req: WithAuthProp<Request>, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    const deck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(deck);
    if (!deck) {
      return next(new AppError('No Deck found with that ID', 404));
    }
    res.status(201).json({
      status: 'success',
      data: {
        deck,
      },
    });
  }
);
