// sécurisation de l'authentification //

const { verify } = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

auth = (req, res, next) => {
  try {
    const JWToken = req.header('JWToken');
    if (!JWToken) {
      return res.status(403).json({ error: 'Utilisateur non conecté.' });
    } else {
      const user = verify(JWToken, process.env.SECRET_KEY);
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erreur ' + error });
  }
};

const JWT = {
  auth: auth,
};

module.exports = JWT;
