import express from "express";
import cors from "cors";
import routerApi from "./routes/api";

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,PATCH,POST,DELETE",
  optionsSucessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/", apiRouter);

app.listen(8000, () => {
  console.log("Server running at 8000");
});

