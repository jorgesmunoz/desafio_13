const express = require("express");
const productTestRouter = express.Router();

const { testProducts } = require("../controllers/products");

productTestRouter.get("/", testProducts);

module.exports = productTestRouter;
