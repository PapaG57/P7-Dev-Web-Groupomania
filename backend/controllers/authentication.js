const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

// création d'un compte utilisateur

exports.signup = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  if (
    firstname == null ||
    lastname == null ||
    username == null ||
    email == null ||
    password == null
  ) {
    return res.status(400).json({ error: 'champs incomplet' });
  }
  if (firstname.length <= 2) {
    return res.status(400).json({ error: 'prenom trop court' });
  }
  if (lastname.length <= 2) {
    return res.status(400).json({ error: 'nom trop court' });
  }
  if (username.length <= 2) {
    return res.status(400).json({ error: 'Username trop court' });
  }

  //Creation de la reg exp pour validation de l'adresse postale
  const EMAIL =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!EMAIL.test(email)) {
    return res.status(400).json({ error: 'adress email non valide' });
  }

  //Creation de la reg exp pour validation du mot de passe
  const PASS = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
  if (!PASS.test(password)) {
    return res.status(400).json({
      error:
        'Votre mot de pass doit inclure 8 à 24 caractère avec majiscule, minuscule, nombre, et caractere special',
    });
  }
  await Users.findOne({ where: { email: email } }).then((exist) => {
    if (exist) {
      return res
        .status(409)
        .json({ error: 'Email ' + email + ' is already in use' });
    } else {
      Users.findOne({ where: { username: username } })
        .then((exist) => {
          if (!exist) {
            bcrypt.hash(password, 10).then((hash) => {
              Users.create({
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: hash,
              })
                .then((user) => {
                  return res.status(201).json({ message: 'Utilisateur créé ' });
                })
                .catch((error) => {
                  return res.status(500).json({ error: 'Erreur ' + error });
                });
            });
          } else {
            return res
              .status(409)
              .json({ error: 'Username ' + username + ' déjà pris' });
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: 'Erreur ' + error });
        });
    }
  });
};

// connection de l'utilisateur existant

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  await Users.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            const JWToken = sign(
              {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                description: user.description,
                profile: user.profile,
                isAdmin: user.isAdmin,
              },
              process.env.SECRET_KEY
            );
            console.log(user.isAdmin);
            return res.status(200).json({
              token: JWToken,
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              username: user.username,
              email: user.email,
              description: user.description,
              profile: user.profile,
              isAdmin: user.isAdmin,
            });
          } else {
            return res.status(403).json({ error: 'Mot de passe invalide' });
          }
        });
      } else {
        return res.status(404).json({ error: email + ' pas trouvé' });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: 'Erreur' + error });
    });
};

exports.auth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ error: 'Token valide non trouuvé' });
  }
};
