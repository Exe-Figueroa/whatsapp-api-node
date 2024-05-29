import express, { json } from "express";
import { WhatsAppRouter } from "./routes/routes.js";
const app =  express();

const port = process.env.PORT || 3000;

app.use(json())

app.use('/whatsapp',WhatsAppRouter)
app.get('/', (req, res)=>{
  res.send(`corriendo en vercel en el puerto ${port}`)
})
app.listen(port, ()=>{
  console.log(`escuchando en el puerto ${port}`);
})
