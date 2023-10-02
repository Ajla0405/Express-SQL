import express from "express";
import pool from "./db/server.js";
import usersRouter from "./routes/userRoutes.js";
import ordersRouter from "./routes/orderRoutes.js";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.listen(port, () =>
  console.log(`Example App is listening on http://localhost:${port}`)
);
