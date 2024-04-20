const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.products = [];
  }
  
  async createProduct(data) {
    try {
      if (!data.title || !data.description || !data.price || !data.thumbnail || !data.code || !data.stock) {
        throw new Error("All fields are required");
      } else {
        const newProduct = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          description: data.description,
          price: data.price,
          thumbnail: data.thumbnail,
          code: data.code,
          stock: data.stock
        };
        this.products.push(newProduct);
        await this.saveProducts();
        return newProduct;
      }
    } catch (error) {
      throw error;
    }
  }

  async readProducts() {
    try {
      return this.products;
    } catch (error) {
      throw error;
    }
  }

  async readOneProduct(id) {
    try {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, newData) {
    try {
      const index = this.products.findIndex(product => product.id === id);
      if (index === -1) {
        throw new Error(`Product with ID ${id} not found`);
      }
      this.products[index] = {
        ...this.products[index],
        ...newData
      };
      await this.saveProducts();
      return this.products[index];
    } catch (error) {
      throw error;
    }
  }

  async destroyProduct(id) {
    try {
      const index = this.products.findIndex(product => product.id === id);
      if (index === -1) {
        throw new Error(`Product with ID ${id} not found`);
      }
      const deletedProduct = this.products.splice(index, 1)[0];
      await this.saveProducts();
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }

  async saveProducts() {
    try {
      const stringData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile("./products.json", stringData);
    } catch (error) {
      throw error;
    }
  }
}


/* ProductManager.createProduct("Product 1", "Description 1", 100, "thumbnail1.jpg", "PD001", 10) */

module.exports = ProductManager;
