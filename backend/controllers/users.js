const { Users } = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');

// création du compte utilisateur //

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Users.findByPk(id, {
      attributes: [
        'firstname',
        'lastname',
        'username',
        'email',
        'description',
        'profile',
        'isAdmin',
      ],
    }).then((user) => {
      if (!user) {
        res.status(404).json({ error: 'User ID ' + id + ' not found.' });
      } else res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).send({ error: 'Erreur ' + error });
  }
};

// modification des données du compte utilisateur //

exports.modifyUser = async (req, res) => {
  console.log(req.body);
  try {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    let profile;
    if ((oldPassword, newPassword)) {
      const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
      if (!PASSWORD_REGEX.test(newPassword)) {
        return res.status(400).json({
          error:
            'Votre mot de passe doit contenir entre 8 et 24 caractères, inclure au moins une majuscule, minuscule, chiffre et caractère spéciaux',
        });
      }
      await Users.findByPk(id);
      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update({ password: hash }, { where: { id: id } });
      });
    }
    if (req.file) {
      profile = `${req.protocol}://${req.get('host')}/image/${
        req.file.filename
      }`;
    }
    await Users.update(
      { ...req.body, profile: profile },
      { where: { id: id } }
    );
    res.status(201).json({ message: 'User modifié' });
  } catch (error) {
    res.status(500).send({ error: 'Erreur ' + error });
  }
};

// suppression du compte //

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  Users.destroy({ where: { id: id } })
    .then(() => res.status(200).json({ message: 'Supprimé' }))
    .catch((error) => res.status(400).json({ error }));
};
