import axios from "axios";

export class WtsppService {
  VerifyToken = (req, res) => {
    try {
      const accessToken = "KJALSDHBAJKL1769623EBKJAS971"; //!generar un token seguro
      const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];

      if (challenge != null && token != null && token == accessToken) {
        res.send(challenge);
      } else {
        res.status(400).send("No Token");
      }

    } catch (error) {
      console.log(error);
      res.status(400).send("Error: " + error)
    }
  }

  ReceivedMessage = async (req, res) => {
    try {
      // const entry = (req.body["entry"])[0];
      // console.log('--------'.repeat(10));
      // console.log(req.body.entry[0].changes[0].value.messages);
      // console.log('--------'.repeat(10));
      
      // const changes = (entry["changes"])[0];
      // const value = changes["value"];
      // const messageObject = value["messages"]; //con esto encontramos el mesaje
      const messageObject = req.body.entry[0].changes[0].value.messages
      console.log(messageObject);
      if (typeof messageObject != "undefined") {
        const messages = messageObject[0];
        const number = messages["from"]
        const text = this.getTextMessage(messages)
        if (text !== "") {
          console.log(text);
          console.log(number);
          const parsedNumber = number.slice(0, 2) + number.slice(3)
          console.log({ parsedNumber });
          const data = {
            "messaging_product": "whatsapp",
            "to": parsedNumber,
            "text": {
              "body": text
            },
            "type": "text"
          }
          this.SendMessageWtspp(data);
        }

      }
      res.send("EVENT_RECEIVED")
    } catch (error) {
      console.log(error);
      res.send("EVENT_NOT_RECEIVED")
    }
  }

  getTextMessage = (message) => {
    let text = "";
    const typeMessage = message["type"];
    if (typeMessage == "text") {
      text = (message["text"])["body"]
    } else if (typeMessage == "interactive") {
      const interactiveObject = message["interactive"];
      const typeInteractive = interactiveObject["type"];

      if (typeInteractive === "button_reply") {
        text = (interactiveObject["button_replay"])["title"];
      } else if (typeInteractive === "list_reply") {
        text = (interactiveObject["list_reply"])["title"];
      } else {
        console.log("sin mensajes");
      }
    } else {
      console.log("sin mensajes");
    }
    return text;
  }

  SendMessageWtspp = async (data) => {
    console.log({ data });
    try {
      const url = 'https://graph.facebook.com/v19.0/347629235091879/messages';

      const axiosRes = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer EAAGprZCTZAHtABOw5NJ4ZC7RUktZBIJGM8dxgnZARKoCDob87CP9K8k0e09ky3ueVrVfOMzwEQ2PUW7I4wGhVf2SGbRXvdhekJLQOMOZCpM0G0vGxL8EpDwZBE6JdH6pWssT647WZBAulfhclzVyebk7KSUXzLmdS2EkZBgTpr0wr3PXl6tujIMAtlvtnAXT0A2Uk`
        }
      });
      console.log({axiosRes});
      console.log('Mensaje enviado:', data);
    } catch (error) {
      console.log({ error });
      console.error('Error al enviar el mensaje:', error.response ? error.response.data : error.message);
    }
  }


}