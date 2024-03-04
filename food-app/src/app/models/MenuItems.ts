import mongoose, { Schema } from "mongoose";

const menuItemsSchems = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    basePrice: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export const MenuItems =
  mongoose.models?.MenuItems ||
  mongoose.model("MenuItems", menuItemsSchems, "menu-items");
