import { Flashcard } from "../models/flashcardModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

export const getAllFlashcards = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  // const userStorage = await User.findOne({ accessToken: accessToken });
  // if (!userStorage) return next(new AppError("No Flashcard found with that ID", 404));
  // const flashcards = await Flashcard.find({ user: userStorage });
  // if (!flashcards || flashcards.length === 0)
  //   return next(new AppError("No flashcard has been created", 401));
  // res.status(200).json({
  //   status: "200",
  //   results: flashcards.length,
  //   data: { flashcards },
  // });
});

export const createFlashcard = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  // const userStorage = await User.findOne({ accessToken: accessToken });
  // if (!userStorage) return next(new AppError("No Flashcard found with that ID", 404));
  const { answer, question, deck } = req.body;
  const newFlashcard = await Flashcard.create({
    answer: answer,
    question: question,
    deck: deck,
    // user: userStorage,
  });

  res.status(201).json({
    status: "success",
    data: {
      newFlashcard,
    },
  });
});

export const getFlashcard = catchAsync(async (req, res, next) => {
  const flashcard = await Flashcard.findById(req.params.id);

  if (!flashcard) {
    return next(new AppError("No Flashcard found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    data: {
      Flashcard,
    },
  });
});

export const deleteFlashcard = catchAsync(async (req, res, next) => {
  const flashcard = await Flashcard.findByIdAndDelete({ _id: req.params.id });

  if (!flashcard) {
    return next(new AppError("No Flashcard found with that ID", 404));
  }
  res.json({
    status: "success",
    data: null,
  });
});

export const updateFlashcard = catchAsync(async (req, res, next) => {
  const flashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!flashcard) {
    return next(new AppError("No Flashcard found with that ID", 404));
  }

  res.status(201).json({
    status: "success",
    data: {
      flashcard,
    },
  });
});
