import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      minlength: 5,
      trim: true,
      maxlength: 50,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 250,
      trim: true,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

export const Auth = mongoose.model("auth", authSchema);
