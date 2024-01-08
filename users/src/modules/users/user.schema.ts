import mongoose from "mongoose";
import { ROLE } from "../../common/enums";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 5,
      maxlength: 50,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 5,
      maxlength: 50,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      minlength: 5,
      trim: true,
      maxlength: 50,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      minlength: 5,
      trim: true,
      maxlength: 50,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      minlength: 5,
      trim: true,
      maxlength: 50,
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
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
