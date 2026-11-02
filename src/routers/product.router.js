import express from "express";
import {
  createProduct,
  deleteProduct,
  searchProduct,
  showAllProduct,
  showSingleProduct,
  updateProduct,
  updateSpecificProperty,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/protect.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { productSchemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { productSchema } from "../schemas/product.schema.js";

const router = express.Router();

router.post(
  "/create",
  productSchemaValidation(productSchema),
  protect,
  authorize("admin"),
  createProduct
);
router.get("/showall", showAllProduct);
router.get("/showsingle/:id", showSingleProduct);
router.put("/update/:id", protect, authorize("manager"), updateProduct);
router.patch(
  "/update/:id",
  protect,
  authorize("manager"),
  updateSpecificProperty
);
router.delete("/delete/:id", protect, authorize("admin"), deleteProduct);
router.get("/search", searchProduct);


export default router;
