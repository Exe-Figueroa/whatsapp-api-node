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
  res.send('askh,d');
}
