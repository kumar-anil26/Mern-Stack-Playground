import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be requied"],
  },
  price: {
    type: Number,
    required: [true, "Price must be requied"],
    min: [0, "Price should be grater than zero (0)."],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity must be requied"],
    min: [0, "Qunatity should be grater than zero (0) or 0."],
  },
});

export const Product = mongoose.model("Product", productSchema);
