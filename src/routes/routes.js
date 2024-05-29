import express from "express";
// import { RecivedMessage, VerifyToken } from "../controllers/whatsAppController.js";
import { WtsppService } from "../services/whatsApp.service.js";
const wServ = new WtsppService()
export const WhatsAppRouter = express.Router();

WhatsAppRouter
  .get('/', wServ.VerifyToken)
  .post('/', wServ.ReceivedMessage)