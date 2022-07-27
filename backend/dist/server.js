"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const products_1 = __importDefault(require("./data/products"));
const app = express();
const port = 5000;
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.get('/api/v1/products', (req, res) => {
    res.json(products_1.default);
});
app.get('/api/v1/products/:id', (req, res) => {
    const product = products_1.default.find((product) => product._id === req.params.id);
    res.json(product);
});
app.listen(port, () => console.log(`Server listening on port ${port}`));
//# sourceMappingURL=server.js.map