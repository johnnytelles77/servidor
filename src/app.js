import express from "express";
import ProductManager from "./product-manager.js"

const app = express();
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/;pid", async (req, res) => {

    try {

        const { pid } = req.params;

        const product = await productManager.getProductsById(parseInt(pid));

        res.status(200),json(product);
    } catch (error) {
        console.log(error)
    }
})

app.listen(8080, () => {
  console.log("Servidor listo en puerto 8080");
});
