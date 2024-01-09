import { Request, Response } from "express";
import bcrypt from "bcrypt-nodejs";
import { User } from "../models/userModel";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.body;
    if (!clerkId) {
      res.status(400);
      throw new Error("Sign up first!!");
    }

    const existingUser = await User.findOne({
      $or: [{ clerkId }],
    });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = new User({ clerkId });
    await user.save();
    res.status(201).json({ status: true, id: user._id });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find();
//     console.log(users);
//     res.status(200).json({ status: true, users });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ status: false, message: err.error });
//   }
// };

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findOneAndUpdate({ clerkId: id }, req.body);
    if (!updatedUser) throw new Error("User is not exist");
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "error", message: err.error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findOneAndDelete({ clerkId: id });
    if (!updatedUser) throw new Error("User is not exist");
    res.json({ status: "success", data: null });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "error", message: err.error });
  }
};
