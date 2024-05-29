// import fs from 'node:fs';
// const myConsole = new console.Console(fs.createWriteStream('./logs.txt'))

import { sendMessageWhatsApp } from "../services/whatsApp.service.js";

export const VerifyToken = (req, res) => {
  try {
    let accessToken = "KJALSDHBAJKL1769623EBKJAS971";
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (challenge != null && accessToken != null && accessToken === token) {
      res.send(challenge);
    } else {
      res.sendStatus(400).send(error);
    }
  } catch (error) {
    res.sendStatus(400).send(error);
  }
};


export const RecivedMessage = (req, res) => {
  console.log('Recibimos un msj');
  try {
    const entry = req.body.entry[0];
    const changes = entry.changes[0];
    const {
      value: { messages },
    } = changes;

    if (messages) {
      const message = messages[0];
      const text = GetUserText(message);
      const number = message.from;
      console.log({text, number});
      sendMessageWhatsApp(`El ususario dijo: ${text}`, number)
    }
    // myConsole.log(messages)
    res.send("EVENT_RECIBED");
  } catch (error) {
    res.send("EVENT_RECIBED");
  }
};

const GetUserText = (message) => {
  let text = "";
  const typeMessage = message.type;
  if (typeMessage === "text") {
    text = message.text.body;
  } else if (typeMessage === "interactive") {
    const typeInteractive = message.interactive.type;
    console.log({ objetoInteractivo: message.interactive });
    if (typeInteractive === "button_reply") {
      text = message.interactive.button_reply.title;
    } else if (typeInteractive === "list_reply") {
      text = message.interactive.list_reply.title;
    } else {
      console.log(
        "------------------------------------ SIN MENSAJE ------------------------------------"
      );
    }
  } else {
    console.log(
      "------------------------------------ SIN MENSAJE ------------------------------------"
    );
  }
  return text;
};
