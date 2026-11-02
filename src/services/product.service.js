import multer from "multer";
import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const createProduct = async (product) => {
  const { name, price, quantity } = product;
  if (!name || !price || !quantity) {
    throw AppError(400, "All fields are mandatory.");
  }
  const newProduct = await Product.create({
    name: name,
    price: price,
    quantity: quantity,
  });
  if (!newProduct) {
    throw AppError(400, "Poduct not created! Something error");
  }
  return newProduct;
};

//! Show All products
export const showAllProduct = async () => {
  const allProducts = await Product.find();
  if (!allProducts) {
    throw AppError(404, "Products not found.");
  }
  return allProducts;
};

//! Show single Product via ID
export const showSingleProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw AppError(200, "Product not found");
  }
  return product;
};

//! Update product if all properties
export const updateProduct = async (id, product) => {
  const { name, price, quantity } = product;
  if (!name?.trim() || !price || !quantity) {
    throw AppError(400, "Something missing! Please check or retry again...");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      price,
      quantity,
    },
    { new: true, runValidators: true }
  );
  console.log(updatedProduct);
  if (!updatedProduct) {
    throw AppError(200, "Sorry! Product not found or not update");
  }
  return updatedProduct;
};

//! Update product with specific properties
export const updateSpecificProperty = async (id, payload) => {
  const updateData = {};
  const { name, price, quantity } = payload;

  if (name !== undefined) updateData.name = name;
  if (price !== undefined) updateData.price = price;
  if (quantity !== undefined) updateData.quantity = quantity;

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!updatedProduct) {
    throw AppError(404, "Product not found! Please try again...");
  }
  return updatedProduct;
};

//! Delete product by ID
export const deleteProduct = async (id) => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw AppError(404, "Product not found");
  }
  return deletedProduct;
};

//! Filtered serch product
export const searchProduct = async (query) => {
  const filter = {};
  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
  }
  if (query?.price) {
    filter.price = query.price;
  }
  console.log(filter);
  const searchedProduct = await Product.find(filter).sort({ name: -1 });
  if (searchedProduct.length == 0) {
    throw AppError(404, "Product Not fount");
  }
  return searchedProduct;
};
