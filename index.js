import express from "express";
import cors from "cors";
import connectDatabase from "./src/database/data.js";
import router from "./src/router/index.js";

const app = express();
const PORT = 3006;

//Initialize db
connectDatabase();
//Define middleware
app.use(cors());
app.use(express.json());
//Define router

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});
//Handle Error

//Run Server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
