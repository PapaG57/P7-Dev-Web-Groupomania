const { Comments } = require('../models');

// création d'un commentaire //

exports.createComment = async (req, res) => {
  if (req.body.comment === null || !req.body.comment) {
    res.status(400).json({ message: 'Comment is required.' });
  } else {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment)
      .then((comment) => {
        res.status(201).json({ message: 'commentaire ajouté ' });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Erreur' + error });
      });
  }
};

// aller sur un commentaire //

exports.getComment = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.status(200).json(comments);
};

// modifier un commentaire //

exports.modifyComment = async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.findOne({ where: { id: commentId } })
    .then(() => {
      Comments.update({ ...req.body }, { where: { id: commentId } });
      res.status(200).json({ message: 'Commentaire rectifié' });
    })
    .catch(() => {
      res.status(400).json({ error: 'Erreur ' });
    });
};

// supprimer un commentaire //

exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({ where: { id: commentId } })
    .then(() => {
      res.status(200).json({ message: 'Commentaire supprimé' });
    })
    .catch((error) => {
      res.status(400).json({ error: 'Erreurs ' + error });
    });
};
