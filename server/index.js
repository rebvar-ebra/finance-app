import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";

/*Config*/

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
/* Route */
app.use("/kpi", kpiRoutes);
app.use("/products", productRoutes);
app.use("/transactions", transactionRoutes);

/* mongoose Setup*/
const PORT = process.env.PORT || 9000;
const connectionString = process.env.MONGODB_URL;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to database");

    const db = client.db();
    /* const collection = db.collection("Products");
    const insertProduct = await collection.insertMany(products);
    console.log("Inserted documents =>", insertProduct);
    const collection1 = db.collection("Transactions");
    const insertTransaction = await collection1.insertMany(transactions);
    console.log("Inserted documents =>", insertTransaction);
     KPI.insertMany(kpis);
     Product.insertMany(products);
     Transaction.insertMany(transactions);
    */

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to database:", err.message);
  }
}

startServer();

// mongoose
//   .connect(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     
//   })
//   .then(async () => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

//     await mongoose.connection.db.dropDatabase();
//     KPI.insertMany(kpis);
//   })
//   .catch((err) => console.error("Error connecting to database:", err.message));
