require("dotenv").config();

const express = require("express");
const pool = require("./db/pool");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Hello from Docker!"
    });
});

app.get("/db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Database connection successful.",
            time: result.rows[0].now
        });
    } catch (e) {
        res.status(500).json({
            message: "Database connection failed.",
            error: e
        });
    }
});

app.get("/products", async (req, res) => {
    try {   
        const result = await pool.query(
            "SELECT * FROM products ORDER BY id"
        );

        res.json({
            products: result.rows
        });
    } catch (e) {
        res.status(500).json({
            message: "Database connection failed.",
            error: e
        });
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});