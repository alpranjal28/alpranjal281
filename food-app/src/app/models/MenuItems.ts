import mongoose, { Schema } from "mongoose";

const menuItemsSchems = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    basePrice: { type: Number, required: true },
    image: { type: String },
    extraSizes: { type: Array },
  },
  { timestamps: true }
);

export const MenuItems =
  mongoose.models?.MenuItems ||
  mongoose.model("MenuItems", menuItemsSchems, "menu-items");
