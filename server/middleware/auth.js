const jwt = require('jsonwebtoken');
const key = process.env.instagramKey;

function auth(req, res, next){
  const token = req.header('Authorization');
  console.log(token);
  if (!token) return res.status(401).send('No provided token....');

  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded;
    next();
  }
  catch(ex) {
    res.status(400).send('Invalid token.');
  }
}
module.exports = auth;
