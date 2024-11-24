import express from "express";
import cors from "cors";
import apiRouter from "./routes/api";
import { initView } from "./setup/init";
import "dotenv/config";

/* 
*  TODO: Separar instancia do Servidor e front no console.
*/

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,PATCH,POST,DELETE",
  optionsSucessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
