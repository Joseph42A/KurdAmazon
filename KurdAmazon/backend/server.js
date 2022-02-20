import express from "express";
import products from "./data/products.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configuration/db.js";
import bodyParser from "body-parser";
import colors from "colors";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import path from "path";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// working for __dirname
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);

const __dirname = path.resolve();

dotenv.config({ path: `${_dirname}/config.env` });

connectDB();
const app = express();
// midllewar

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
if (process.env.NODE_ENV === "developoment") app.use(morgan("dev"));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

/// make the folder static
// const __dirname = path.resolve();
// app.use("uploads", express.static(path.join(__dirname, "/uploads ")));
app.use("/uploads", express.static("uploads"));

// Error middleware
app.use(notFound);
app.use(errorHandler);
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    "server running : in ".yellow.bold,
    process.env.NODE_ENV.yellow.bold,
    " mode on port ".yellow.bold,
    PORT.yellow.bold
  )
);
