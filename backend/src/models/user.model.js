import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: "false",
    },
    role: {
      type: String,
      enum: ["Athlete", "Family", "Sponsor", "Fan"],
    },
    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
