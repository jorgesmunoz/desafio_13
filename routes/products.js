const express = require("express");
const productRouter = express.Router();
const { login } = require("../middleware/auth");
const { verifyAuth } = require("../middleware/authentication");

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

productRouter.get("/:id", verifyAuth, getProductById);
productRouter.get("/", verifyAuth, getAllProducts);
productRouter.post("/", verifyAuth, addProduct);
productRouter.put("/:id", verifyAuth, updateProduct);
productRouter.delete("/:id", verifyAuth, deleteProduct);

module.exports = productRouter;
