import mongoose from "mongoose";
import { ROLE } from "../../common/enums";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: "USER",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, _id: false }
);

const User = mongoose.model("User", userSchema);

export default User;
