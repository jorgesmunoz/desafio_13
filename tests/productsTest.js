const { faker } = require("@faker-js/faker");

faker.locale = "en";

const products = () => ({
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(10, 1000, 2, "$"),
  picture: faker.image.food(),
  stock: faker.random.numeric(4),
});

module.exports = {
  products,
};
