import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
