import express from "express";
import { convertCurrency } from "../controllers/currencyController";

const router = express.Router();

router.post("/currency/:moeda_origem/:moeda_destino/:valor", convertCurrency);
