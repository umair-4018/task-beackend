import dotenv from 'dotenv';
dotenv.config();
var secret = process.env.SECRET;
import jwt from 'jsonwebtoken';

function verifyTokens(req, res, next) {
  var token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  // Remove the "Bearer " prefix
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).send({ auth: false, message: 'Invalid token format.' });
  }

  const tokenValue = tokenParts[1];

  jwt.verify(tokenValue, secret, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    } else {
      req.details = decoded;
      next();
    }
  });
}

export default verifyTokens;
