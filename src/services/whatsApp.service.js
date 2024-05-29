import https from "node:https"

export const sendMessageWhatsApp =  (textResponse, number)=>{
  console.log({textResponse, number});
  const cleanedNumber = '54' + number.split('549')[1]
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
  const options = {
    host: "graph.facebook.com",
    path: "/v19.0/347629235091879/messages",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer EAAGprZCTZAHtABO6A3GQa1rbHqe75B1ILlDtPFDZAminyA23KKrbwYZA8IDR3lTOS8KVkrMJmr6EI19pzIbYVZB9iStswT0SR3dqrSX9meaDq9ZAIAupynaINBK4pDYN3ruoWzTHgYPmtXCHQK6aZCENmnzxWaOIy4Eil9YlrwoyeFVXnYQV1B4btDMzwNqTOh3SuZBHvHtIrdQXNZCZAJvrAYP90AZCptqsihANkeyUdwZD",
    },
  };
  console.log('---------------------------------------- ANTES DEL REQ ----------------------------------------');
  const req = https.request(options, (res) => {
    console.log('---------------------------------------- DENTRO DEL REQ ----------------------------------------');
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('Response from WhatsApp API: ', responseData);
      const responseJson = JSON.parse(responseData);
      if (res.statusCode === 200) {
        console.log('Message sent successfully:', responseJson);
      } else {
        console.error('Error sending message:', responseJson);
      }
    });
  });
  console.log('---------------------------------------- DESPUÉS DEL REQ ----------------------------------------');
  
  req.on('error', (e) => {
    console.error('Error en el request => ', e);
  });
  req.write(data);
  req.end();
}
