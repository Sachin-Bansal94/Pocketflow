import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import db from "./dbConnect.js";

import userRoute from "./routes/usersRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

const app = express();

const port = 8080;

// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// ================= TEST ROUTE =================

app.get("/", (req, res) => {

    res.send("PocketFlow Backend Running Successfully");
});

// ================= ROUTES =================

app.use("/api/user", userRoute);

app.use("/api/transaction", transactionRoute);

// ================= SERVER =================

app.listen(port, () => {

    console.log(`Server running on port ${port}`);
});