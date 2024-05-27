import express from "express";
import { RecivedMessage, VerifyToken } from "../controllers/whatsAppController.js";

export const WhatsAppRouter = express.Router();

WhatsAppRouter
  .get('/', VerifyToken)
  .post('/', RecivedMessage)