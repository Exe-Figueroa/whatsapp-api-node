import express, { json } from "express";
import { WhatsAppRouter } from "./routes/routes.js";
const app =  express();

const port = process.env.PORT || 3000;

app.use(json())

app.use('/whatsapp',WhatsAppRouter)

app.listen(port, ()=>{
  console.log(`escuchando en el puerto ${port}`);
})
