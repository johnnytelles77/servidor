import fs from 'fs';
import crypto from 'crypto';

class ProductManager {
    constructor() {
        this.path = "./products.json";
        this.products = [];
        this.init();
    }

    init() {
        try {
            const exists = fs.existsSync(this.path);
            if (!exists) {
                const stringData = JSON.stringify([], null, 2);
                fs.writeFileSync(this.path, stringData);
                console.log("Product file created!");
            } else {
                console.log("Product file connected!");
            }
        } catch (error) {
            throw error;
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                throw new Error("All fields are required!");
            } else {
                const newProduct = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                };
                let all = await fs.promises.readFile(this.path, "utf-8");
                all = JSON.parse(all);
                all.push(newProduct);
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                return newProduct;
            }
        } catch (error) {
            throw error;
        }
    }

    async getProducts() {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            return all;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let product = all.find((each) => each.id === id);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, data) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let product = all.find((each) => each.id === id);
            if (product) {
                for (let prop in data) {
                    product[prop] = data[prop];
                }
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let product = all.find((each) => each.id === id);
            if (product) {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered);
            }
            return product;
        } catch (error) {
            throw error;
        }
    }
}

// Ejemplo de uso
async function test() {
    try {
        const manager = new ProductManager();
        await manager.addProduct("Product 1", "Description 1", 100, "thumbnail1.jpg", "PD001", 10);
        await manager.addProduct("Product 2", "Description 2", 200, "thumbnail2.jpg", "PD002", 20);
        await manager.addProduct("Product 3", "Description 3", 300, "thumbnail3.jpg", "PD003", 30);
        const products = await manager.getProducts();
        console.log(products);
        const product = await manager.getProductById(products[0].id);
        console.log(product);
        await manager.updateProduct(product.id, { price: 150 });
        await manager.deleteProduct(products[1].id);
    } catch (error) {
        console.log(error);
    }
}

// Ejecutar la prueba
test();

const productManagerInstance = new ProductManager();
export default productManagerInstance;
