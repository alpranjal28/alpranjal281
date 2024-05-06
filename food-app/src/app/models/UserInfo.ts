import mongoose, { Schema, model } from "mongoose";

const UserInfoSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    postalCode: { type: Number },
    phone: { type: Number },
    admin: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserInfo =
  mongoose.models?.UserInfo || model("UserInfo", UserInfoSchema, "user-info");
