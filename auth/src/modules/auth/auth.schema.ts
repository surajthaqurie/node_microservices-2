import mongoose from "mongoose";
import { IAuthDocument } from "../../common/interface";

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

export const Auth = mongoose.model<IAuthDocument>("auth", authSchema);
