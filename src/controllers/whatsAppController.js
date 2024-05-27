// import fs from 'node:fs';
// const myConsole = new console.Console(fs.createWriteStream('./logs.txt'))

export const VerifyToken = (req, res)=>{
  try {
    let accessToken = 'KJALSDHBAJKL1769623EBKJAS971'; 
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (challenge != null && accessToken != null && accessToken === token) {
      res.send(challenge);
    } else {
    res.send(400).send(error);
      
    }
  } catch (error) {
    res.send(400).send(error);
  }

}
export const RecivedMessage = (req, res)=>{
  try {
    const entry = req.body.entry[0]
    const changes = entry.changes[0]
    const {value: {messages} } = changes;
    console.log(messages);
    // myConsole.log(messages)
    res.send('EVENT_RECIBED')
  } catch (error) {
    res.send('EVENT_RECIBED')
  }
}
