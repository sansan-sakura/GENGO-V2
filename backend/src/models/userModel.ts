import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    clerkId: { type: String, required: true },
    todayGoal: { type: String, default: "Goal 🎯" },
    monthlyGoal: { type: String, default: "Goal 🎯" },
    yearlyGoal: { type: String, default: "Goal 🎯" },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
