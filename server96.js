const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let inventory = [];

// Get All Products
app.get("/api/products", (req, res) => {
    res.json(inventory);
});

// Add Product
app.post("/api/products", (req, res) => {
    const { name, quantity } = req.body;

    const product = {
        id: Date.now(),
        name,
        quantity
    };

    inventory.push(product);

    res.json({
        message: "Product Added Successfully",
        product
    });
});

// Delete Product
app.delete("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    inventory = inventory.filter(item => item.id !== id);

    res.json({
        message: "Product Deleted"
    });
});

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});