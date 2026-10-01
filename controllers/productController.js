const productService = require("../services/productService");

async function getProducts(req, res) {
    try {
        let data = await productService.getAllProducts();
        return res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getProduct(req, res) {
    const id = Number(req.params.id);
    try {
        let product = await productService.getProductById(id);
        if (!product) return res.status(404).json({ message: "Not found" });
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addProduct(req, res) {
    try {
        const newProduct = { id: Date.now(), name: "Dummy Item", price: 100 };
        await productService.modifyData(newProduct);
        res.json({ message: "Data modified successfully, Cache cleared!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getProducts, getProduct, addProduct };