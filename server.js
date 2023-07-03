import "dotenv/config"; // loads variables from .env file
import express from "express";
import ViteExpress from "vite-express";

import * as paypal from "./paypal-api.js";

const {
    PORT = 3000
} = process.env;

const app = express();

app.use(express.json());

app.post("/my-server/create-paypal-order", async (req, res) => {
    try {
        const order = await paypal.createOrder();
        res.json(order);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post("/my-server/capture-paypal-order", async (req, res) => {
    const {
        orderID
    } = req.body;
    try {
        const captureData = await paypal.capturePayment(orderID);
        res.json(captureData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

ViteExpress.listen(app, PORT, () => console.log("Server is listening...", PORT));