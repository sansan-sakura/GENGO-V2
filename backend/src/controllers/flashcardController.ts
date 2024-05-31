import { User } from '../models/userModel';
import { Flashcard } from '../models/flashcardModel';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import clerkClient from '@clerk/clerk-sdk-node';

export const getAllFlashcards = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const userStorage = await User.findOne({ clerkId: id });
    if (!userStorage) return next(new AppError('No Flashcard found with that ID', 404));
    const flashcards = await Flashcard.find({ user: userStorage });
    if (!flashcards || flashcards.length === 0)
      return next(new AppError('No flashcard has been created', 401));
    res.status(200).json({
      status: '200',
      results: flashcards.length,
      data: { flashcards },
    });
  }
);

export const createFlashcard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    const user = await clerkClient.users.getUser(req.auth.userId);
    console.log('create');
    const { answer, question, deck } = req.body;
    console.log(answer, question, deck);
    const newFlashcard = await Flashcard.create({
      answer: answer,
      question: question,
      deck: deck,
      user: user.id,
    });
    console.log(newFlashcard);
    res.status(201).json({
      status: 'success',
      data: {
        newFlashcard,
      },
    });
  }
);

export const getFlashcard = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
  const flashcard = await Flashcard.findById(req.params.id);

  if (!flashcard) {
    return next(new AppError('No Flashcard found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      Flashcard,
    },
  });
});

export const deleteFlashcard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    const flashcard = await Flashcard.findByIdAndDelete({ _id: req.params.id });

    if (!flashcard) {
      return next(new AppError('No Flashcard found with that ID', 404));
    }
    res.json({
      status: 'success',
      data: null,
    });
  }
);

export const updateFlashcard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    const flashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!flashcard) {
      return next(new AppError('No Flashcard found with that ID', 404));
    }

    res.status(201).json({
      status: 'success',
      data: {
        flashcard,
      },
    });
  }
);
