// import fs from 'node:fs';
// const myConsole = new console.Console(fs.createWriteStream('./logs.txt'))

export const VerifyToken = (req, res) => {
  try {
    let accessToken = "KJALSDHBAJKL1769623EBKJAS971";
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (challenge != null && accessToken != null && accessToken === token) {
      res.send(challenge);
    } else {
      res.send(400).send(error);
    }
  } catch (error) {
    res.send(400).send(error);
  }
};


export const RecivedMessage = (req, res) => {
  try {
    const entry = req.body.entry[0];
    const changes = entry.changes[0];
    const {
      value: { messages },
    } = changes;
    
    if (!messages) {
      const message = messages[0];
      const text = GetUserText(message);
      console.log({text});
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
