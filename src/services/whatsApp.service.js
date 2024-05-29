
export const sendMessageWhatsApp =  async (textResponse, number)=>{
  console.log({textResponse, number});
  const cleanedNumber = number.slice(0, 2) + number.slice(3)
  console.log(cleanedNumber);
  const body = {
    messaging_product: "whatsapp",
    to: number,
    text: {
      body: textResponse
    },
    type: "text"
  };
  const data = JSON.stringify(body);
 
  const dataRes = await fetch('https://graph.facebook.com/v19.0/347629235091879/messages', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer EAAGprZCTZAHtABO6A3GQa1rbHqe75B1ILlDtPFDZAminyA23KKrbwYZA8IDR3lTOS8KVkrMJmr6EI19pzIbYVZB9iStswT0SR3dqrSX9meaDq9ZAIAupynaINBK4pDYN3ruoWzTHgYPmtXCHQK6aZCENmnzxWaOIy4Eil9YlrwoyeFVXnYQV1B4btDMzwNqTOh3SuZBHvHtIrdQXNZCZAJvrAYP90AZCptqsihANkeyUdwZD",
    },
    body: data
  })
  const respuesta = await dataRes.json()
  console.log("dataRes => ", dataRes);
  console.log("respuesta => ", respuesta);
}
