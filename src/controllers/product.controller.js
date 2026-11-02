import * as serviceProduct from "../services/product.service.js";

//! create new product
export const createProduct = async (req, res, next) => {
  const newProduct = await serviceProduct.createProduct(req.body);
  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    Product: newProduct,
  });
};

//! show All products
export const showAllProduct = async (req, res, next) => {
  const allProducts = await serviceProduct.showAllProduct();
  console.log(req.cookies.refreshToken);
  res.status(200).json({
    success: true,
    message: "Products finds successfuylly ",
    products: allProducts,
  });
};

//! Show single product
export const showSingleProduct = async (req, res, next) => {
  const product = await serviceProduct.showSingleProduct(req.params.id);
  console.log(product);
  res.status(200).json({
    success: true,
    message: "Product found successfully",
    product: product,
  });
};

//! Update Product of entire properties of product
export const updateProduct = async (req, res, next) => {
  const updatedProduct = await serviceProduct.updateProduct(
    req.params.id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Product Update successfully",
    updatedProduct: updatedProduct,
  });
};

//! Update Product of specific properties of product
export const updateSpecificProperty = async (req, res) => {
  const updatedProduct = await serviceProduct.updateSpecificProperty(
    req?.params?.id,
    req?.body
  );
  res.status(200).json({
    success: true,
    message: "Product update successfully",
    updatedProduct: updatedProduct,
  });
};

//! Delete Product by ID
export const deleteProduct = async (req, res) => {
  const deletedProduct = await serviceProduct.deleteProduct(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    deletedProduct: deletedProduct,
  });
};

//! Search Product
export const searchProduct = async (req, res) => {
  const searchedProduct = await serviceProduct.searchProduct(req.query);
  res.status(200).json({
    success: true,
    message: "Product Fetch successfully",
    SearchedProduct: searchedProduct,
  });
};

