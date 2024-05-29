// import https from "node:https"

export const sendMessageWhatsApp = async  (textResponse, number)=>{
  const cleanedNumber = number.slice(0, 2) + number.slice(3)
  console.log(cleanedNumber);
  const body = {
    "messaging_product": "whatsapp",
    "to": number,
    "text": {
      "body": textResponse
    },
    "type": "text"
  };
  console.log({body});
  const data = JSON.stringify(body);
  // const options = {
  //   host: "graph.facebook.com",
  //   path: "/v19.0/347629235091879/messages",
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer EAAGprZCTZAHtABO6A3GQa1rbHqe75B1ILlDtPFDZAminyA23KKrbwYZA8IDR3lTOS8KVkrMJmr6EI19pzIbYVZB9iStswT0SR3dqrSX9meaDq9ZAIAupynaINBK4pDYN3ruoWzTHgYPmtXCHQK6aZCENmnzxWaOIy4Eil9YlrwoyeFVXnYQV1B4btDMzwNqTOh3SuZBHvHtIrdQXNZCZAJvrAYP90AZCptqsihANkeyUdwZD",
  //   },
  // };
  
  fetch('https://graph.facebook.com/v19.0/347629235091879/messages', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer EAAGprZCTZAHtABO6A3GQa1rbHqe75B1ILlDtPFDZAminyA23KKrbwYZA8IDR3lTOS8KVkrMJmr6EI19pzIbYVZB9iStswT0SR3dqrSX9meaDq9ZAIAupynaINBK4pDYN3ruoWzTHgYPmtXCHQK6aZCENmnzxWaOIy4Eil9YlrwoyeFVXnYQV1B4btDMzwNqTOh3SuZBHvHtIrdQXNZCZAJvrAYP90AZCptqsihANkeyUdwZD",
    },
    body: data
  })
  .then(res => {console.log(res); return res.json()})
  .then(data=>console.log(data))
  .catch(e=>console.error(e))

}
