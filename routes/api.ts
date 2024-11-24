import express from "express";
import CurrencyController from "../controllers/currencyController";
import CurrencyService from "../services/currencyService";
import ApiClient from "../utils/apiClient";
import { initApplication } from "../setup/init";

const currencyController = initApplication();

const apiRouter = express.Router();

apiRouter.get("/currency/:moeda_origem/:moeda_destino/:valor", currencyController.convertCurrency);

module.exports = apiRouter;
