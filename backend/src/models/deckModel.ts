import { AppError } from "../utils/appError";
import { Category } from "./categoryModel";
import mongoose from "mongoose";
const deckSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, "A category must be more than 3 charactors 🚦"],
    },
    isDone: { type: Boolean, default: false },
    isChecked: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, //user can edit
    reviewed_date: { type: [Date], default: undefined },
    last_reviewed_date: { type: Date, required: true, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flashcard" }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "deck needs to know the user"],
    },
  },
  { timestamps: true }
);

// deckSchema.pre("save", async function (next) {
//   this.category = await Category.findById(this.category);
//   // if (this.category.category !== "all") {
//   if (!this.category) return new AppError("Category doesn't exist", 400);
//   // }
//   // this.user = await User.findById(this.user);
//   // if (!this.user) return new AppError("User doesn't exist", 400);
//   next();
// });

export const Deck: any = mongoose.model("Deck", deckSchema);
