// // import https from "node:https"

// export const sendMessageWhatsApp = async  (textResponse, number)=>{
//   const cleanedNumber = number.slice(0, 2) + number.slice(3)
//   console.log(cleanedNumber);
//   const body = {
//     "messaging_product": "whatsapp",
//     "to": number,
//     "text": {
//       "body": textResponse
//     },
//     "type": "text"
//   };
//   console.log({body});
//   const data = JSON.stringify(body);
//   // const options = {
//   //   host: "graph.facebook.com",
//   //   path: "/v19.0/347629235091879/messages",
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     Authorization: "Bearer EAAGprZCTZAHtABO6A3GQa1rbHqe75B1ILlDtPFDZAminyA23KKrbwYZA8IDR3lTOS8KVkrMJmr6EI19pzIbYVZB9iStswT0SR3dqrSX9meaDq9ZAIAupynaINBK4pDYN3ruoWzTHgYPmtXCHQK6aZCENmnzxWaOIy4Eil9YlrwoyeFVXnYQV1B4btDMzwNqTOh3SuZBHvHtIrdQXNZCZAJvrAYP90AZCptqsihANkeyUdwZD",
//   //   },
//   // };

//   fetch('https://graph.facebook.com/v19.0/347629235091879/messages', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer EAAGprZCTZAHtABO6A3GQa1rbHqe75B1ILlDtPFDZAminyA23KKrbwYZA8IDR3lTOS8KVkrMJmr6EI19pzIbYVZB9iStswT0SR3dqrSX9meaDq9ZAIAupynaINBK4pDYN3ruoWzTHgYPmtXCHQK6aZCENmnzxWaOIy4Eil9YlrwoyeFVXnYQV1B4btDMzwNqTOh3SuZBHvHtIrdQXNZCZAJvrAYP90AZCptqsihANkeyUdwZD",
//     },
//     body: data
//   })
//   .then(res => {console.log(res); return res.json()})
//   .then(data=>console.log(data))
//   .catch(e=>console.error(e))

// }


import axios from "axios";



export class WtsppService extends PromptServices {
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
      const entry = (req.body["entry"])[0];
      const changes = (entry["changes"])[0];
      const value = changes["value"];
      const messageObject = value["messages"]; //con esto encontramos el mesaje
      if (typeof messageObject != "undefined") {
        const messages = messageObject[0];
        const number = messages["from"]
        const text = this.getTextMessage(messages)
        if (text !== "") {
          console.log(text);
          console.log(number);
          const parsedNumber = number.slice(0, 2) + number.slice(3)
          console.log({ parsedNumber });
          await this.Process(text, parsedNumber); //! a la hora de adquirir el numero en whts me lo trae con un 9 un y en la web no lo identifica apesar de ser el mismo investigar 
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

      await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer EAAGprZCTZAHtABO6A3GQa1rbHqe75B1ILlDtPFDZAminyA23KKrbwYZA8IDR3lTOS8KVkrMJmr6EI19pzIbYVZB9iStswT0SR3dqrSX9meaDq9ZAIAupynaINBK4pDYN3ruoWzTHgYPmtXCHQK6aZCENmnzxWaOIy4Eil9YlrwoyeFVXnYQV1B4btDMzwNqTOh3SuZBHvHtIrdQXNZCZAJvrAYP90AZCptqsihANkeyUdwZD`
        }
      });

      console.log('Mensaje enviado:', data);
    } catch (error) {
      console.log({ error });
      console.error('Error al enviar el mensaje:', error.response ? error.response.data : error.message);
    }
  }


}