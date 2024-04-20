import express from 'express';
import productManagerInstance from './fs/files/product-manager.js'; 

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);
app.post("/products", create);
app.get("/products", read);
app.get("/products/:id", readOne);
app.put("/products/:id", update);
app.delete("/products/:id", destroy);

async function index(req, res) {
  try {
    const message = "Welcome to product-manager";
    return res.json({ status: 200, response: message });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, response: error.message });
  }
}

async function create(req, res) {
  try {
    const data = req.body;
    const one = await productManagerInstance.addProduct(data.title, data.description, data.price, data.thumbnail, data.code, data.stock);
    return res.json({ status: 201, response: one });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

async function read(req, res) {
  try {
    const products = await productManagerInstance.getProducts();
    if (products.length > 0) {
      return res.json({ status: 200, response: products });
    } else {
      return res.json({ status: 404, response: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, response: error.message });
  }
}

async function readOne(req, res) {
  try {
    const { id } = req.params;
    const product = await productManagerInstance.getProductById(id);
    if (product) {
      return res.json({ status: 200, response: product });
    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await productManagerInstance.updateProduct(id, data);
    if (product) {
      return res.json({ status: 200, response: product });
    }
    const error = new Error("Not found!");
    error.status = 404;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params;
    const product = await productManagerInstance.deleteProduct(id);
    if (product) {
      return res.json({ status: 200, response: product });
    }
    const error = new Error("Not found!");
    error.status = 404;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
  }
}
