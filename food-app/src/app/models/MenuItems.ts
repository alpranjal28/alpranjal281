import mongoose, { Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const MenuItemsSchems = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    basePrice: { type: Number, required: true },
    image: { type: String },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredients: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

export const MenuItems =
  mongoose.models?.MenuItems ||
  mongoose.model("MenuItems", MenuItemsSchems, "menu-items");
