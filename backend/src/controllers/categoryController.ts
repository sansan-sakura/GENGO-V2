import clerkClient from '@clerk/clerk-sdk-node';
import { Category } from '../models/categoryModel';
import { User } from '../models/userModel';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';

export const getCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth?.sessionId) return next(new AppError('Please login', 404));

  const categories = await Category.find({ user: req.auth.userId });

  res.status(200).json({
    status: '200',
    results: categories.length,
    data: { categories },
  });
});

export const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    const user = await clerkClient.users.getUser(req.auth.userId);
    const { category } = req.body;
    console.log(category);
    const newCategory = await Category.create({ category: category, user: user.id });
    console.log(newCategory);
    res.status(201).json({
      status: 'success',
      data: {
        newCategory,
      },
    });
  }
);

export const getCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
  const category = await Category.findById(req.params.id);
  res.status(201).json({
    status: 'success',
    data: {
      category,
    },
  });
});

export const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    const deletedCategory = await Category.findOneAndDelete({ _id: req.params.id });

    res.json({
      status: 'success',
      data: {},
    });
  }
);

export const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth?.sessionId) return next(new AppError('Please login', 404));
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return next(new AppError('No category found with that ID', 404));
    }

    res.status(201).json({
      status: 'success',
      data: {
        category,
      },
    });
  }
);
