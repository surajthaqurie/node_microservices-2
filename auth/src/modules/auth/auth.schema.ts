import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    required: true,
  },
  authName: {
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
  password: {
    type: String,
    minlength: 6,
    maxlength: 250,
    trim: true,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export const Auth = mongoose.model("auth", authSchema);
