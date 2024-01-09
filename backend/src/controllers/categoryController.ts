import { Category } from "../models/categoryModel";
import { User } from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";

export const getCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id;
  const userStorage = await User.findOne({ clerkId: id });
  if (!userStorage)
    return res.status(400).json({ status: false, message: "There is no user with the ID" });

  const categories = await Category.find({ user: userStorage });

  res.status(200).json({
    status: "200",
    results: categories.length,
    data: { categories },
  });
});

export const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const userStorage = await User.findOne({ clerkId: id });
    if (!userStorage)
      return res.status(400).json({ status: false, message: "There is no user with the ID" });
    const { category } = req.body;
    const newCategory = await Category.create({ category: category, user: userStorage });
    res.status(201).json({
      status: "success",
      data: {
        newCategory,
      },
    });
  }
);

export const getCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const category = await Category.findById(req.params.id);
  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

export const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedCategory = await Category.findOneAndDelete({ _id: req.params.id });

    res.json({
      status: "success",
      data: null,
    });
  }
);

export const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return next(new AppError("No category found with that ID", 404));
    }

    res.status(201).json({
      status: "success",
      data: {
        category,
      },
    });
  }
);
