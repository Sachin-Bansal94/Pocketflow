import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./dbConnect.js";

import userRoute from "./routes/usersRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

// ================= MIDDLEWARES =================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ================= CORS =================

// FOR DEVELOPMENT + DEPLOYMENT

app.use(
    cors({
        origin: "https://pocketflow-9rbs.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

// ================= ROUTES =================

app.get("/", (req, res) => {

    res.send(
        "PocketFlow Backend Running Successfully"
    );
});

// USER ROUTES

app.use(
    "/api/user",
    userRoute
);

// TRANSACTION ROUTES

app.use(
    "/api/transaction",
    transactionRoute
);

// ================= START SERVER =================

app.listen(port, () => {

    console.log(
        `Server running on port ${port}`
    );
});