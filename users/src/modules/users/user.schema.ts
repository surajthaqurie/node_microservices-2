import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    required: true,
  },
  userName: {
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

const User = mongoose.model("User", userSchema);

export default User;
