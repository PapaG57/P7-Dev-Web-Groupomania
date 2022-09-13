const { Posts, Likes, Comments } = require('../models');
const fs = require('fs');

exports.createPost = async (req, res) => {
  let image;
  console.log(req.body);
  if (req.body.content === null || !req.body.content) {
    res.status(400).json({ message: 'Image vide' });
  } else {
    if (req.file) {
      image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
    }
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    post.image = image;
    await Posts.create(post)
      .then((post) => {
        res.status(201).json({ message: 'Publication effectuée !' });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Erreur' + error });
      });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll({ include: [Likes, Comments] });
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
    res.status(200).json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
  } catch (error) {
    res.status(400).json({ error: 'Erreur' + error });
  }
};

exports.getPost = async (req, res) => {
  id = req.params.id;
  await Posts.findOne({ where: { id: id }, include: Comments })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({ error: 'Erreur' + error });
    });
};

exports.modifyPost = async (req, res) => {
  id = req.params.id;
  let image;
  if (req.file) {
    Posts.findOne({ where: { id: id } });
    image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`;
  }
  await Posts.findOne({ where: { id: id } })
    .then(() => {
      Posts.update({ ...req.body, image: image }, { where: { id: id } });
      res.status(200).json({ message: 'Publication modifié' });
    })
    .catch((error) => {
      res.status(400).json({ error: 'Erreur' + error });
    });
};

exports.deletePost = (req, res) => {
  id = req.params.id;
  Posts.destroy({ where: { id: id } })
    .then(() => {
      res.status(200).json({ message: 'Post suprimé' });
    })
    .catch((error) => res.status(500).json({ error }));
};