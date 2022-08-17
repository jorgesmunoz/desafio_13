const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);
const mockProducts = require("../tests/productsTest");

const getAllProducts = async (req, res) => {
  try {
    const response = await knex("products");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await knex("products").where({ id: id });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};

const addProduct = async (req, res) => {
  const product = req.body;
  try {
    const newProduct = await knex("products").insert(product);
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  try {
    const updatedProduct = await knex("products")
      .where({ id: id })
      .update(product);
    console.log(updatedProduct);
    res.status(200).send(`product updated`);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await knex("products").where({ id: id }).del();
    res.status(200).send("product deleted");
  } catch (error) {
    res.status(400).send({ error: "product not found" });
  }
};

const testProducts = (req, res) => {
  let products = [];
  try {
    for (let i = 0; i < 5; i++) {
      let product = mockProducts.products();
      product.id = i + 1;
      products.push(product);
    }
    return res.status(200).send(products);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  testProducts,
};
